#!/usr/bin/env python3
"""Generate a reviewable metadata-only SQL seed. Never reads credentials or source bodies.

python3 scripts/build_source_catalog_seed.py --out supabase/source_catalog_seed.sql
Apply only after district_catalog_provenance migration and the versioned note imports.
"""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def literal(value):
    return "'" + json.dumps(value, ensure_ascii=False).replace("'", "''") + "'::jsonb"

def build(provenance, definitions, associations):
    imported = {s for n in associations for s in n['source_ids']}
    collections = [
        {'id': provenance['sourceTruthFolder'], 'title': 'Collective AI Inc Source-of-Truth Docs', 'url': 'https://drive.google.com/drive/folders/' + provenance['sourceTruthFolder'], 'scan_complete': True},
        {'id': provenance['everythingCollectiveFolder'], 'title': 'Everything Collective — scoped recursive audit', 'url': 'https://drive.google.com/drive/folders/' + provenance['everythingCollectiveFolder'], 'scan_complete': False}
    ]
    documents = []
    for d in provenance['documents']:
        reviewed = 'reviewed' in d.get('reviewState', '') and 'unreviewed' not in d.get('reviewState', '')
        state = 'imported' if d['id'] in imported else 'reviewed' if reviewed else 'blocked' if d.get('status') in ('no-readable-text', 'no_readable_text', 'error', 'empty') else 'inventoried'
        documents.append({'id': d['id'], 'collection_id': provenance['sourceTruthFolder'] if d['scope'] == 'source-truth' else provenance['everythingCollectiveFolder'], 'title': d['title'], 'url': d['url'], 'mime_type': d.get('mimeType'), 'review_state': state, 'source_modified_at': d.get('sourceModified')})
    sql = ['-- Generated source metadata. Original documents and credentials are excluded.', 'begin;']
    sql.append(f"""insert into public.vault_source_collections(id,title,url,last_scanned_at,scan_complete)
select id,title,url,{literal(provenance['retrievedDate'])}#>>'{{}}',scan_complete
from jsonb_to_recordset({literal(collections)}) x(id text,title text,url text,scan_complete boolean)
on conflict(id) do update set title=excluded.title,url=excluded.url,last_scanned_at=excluded.last_scanned_at,scan_complete=excluded.scan_complete;""".replace(f"{literal(provenance['retrievedDate'])}#>>'{{}}'", "'" + provenance['retrievedDate'] + "'::timestamptz"))
    sql.append(f"""insert into public.vault_districts(id,title,purpose,kind,priority,kit,source_urls,source_notes)
select id,title,purpose,'thematic',priority,array(select jsonb_array_elements_text(kit)),array(select jsonb_array_elements_text("sourceUrls")),array(select jsonb_array_elements_text("sourceNotes"))
from jsonb_to_recordset({literal(definitions)}) x(id text,title text,purpose text,priority integer,kit jsonb,"sourceUrls" jsonb,"sourceNotes" jsonb)
on conflict(id) do update set title=excluded.title,purpose=excluded.purpose,priority=excluded.priority,kit=excluded.kit,source_urls=excluded.source_urls,source_notes=excluded.source_notes;""")
    sql.append(f"""insert into public.district_note_links(district_id,note_name)
select d.id,n.name from jsonb_to_recordset({literal(definitions)}) d(id text,"noteNames" jsonb)
cross join lateral jsonb_array_elements_text(d."noteNames") names(name) join public.notes n on n.name=names.name
on conflict do nothing;""")
    for i in range(0, len(documents), 75):
        sql.append(f"""insert into public.vault_source_documents(id,collection_id,title,url,mime_type,review_state,source_modified_at,reviewed_at)
select id,collection_id,title,url,mime_type,review_state,source_modified_at,
case when review_state in ('reviewed','imported') then '{provenance['retrievedDate']}'::timestamptz else null end
from jsonb_to_recordset({literal(documents[i:i+75])}) x(id text,collection_id text,title text,url text,mime_type text,review_state text,source_modified_at timestamptz)
on conflict(id) do update set title=excluded.title,url=excluded.url,mime_type=excluded.mime_type,review_state=excluded.review_state,source_modified_at=excluded.source_modified_at,reviewed_at=excluded.reviewed_at;""")
    sql.append(f"""insert into public.note_source_links(note_name,source_id,note_version)
select n.name,s.source_id,n.version from jsonb_to_recordset({literal(associations)}) a(name text,source_ids jsonb,body_md5 text)
join public.notes n on n.name=a.name and md5(rtrim(n.body,E'\\n'))=a.body_md5
cross join lateral jsonb_array_elements_text(a.source_ids) s(source_id)
join public.vault_source_documents d on d.id=s.source_id
on conflict(note_name,source_id) do update set note_version=excluded.note_version,recorded_at=now();""")
    sql += ['commit;', 'select district_id,note_count,linked_note_count,reviewed_current_note_count from public.district_source_coverage order by district_id;']
    return '\n\n'.join(sql) + '\n'

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    load = lambda name: json.loads((ROOT / 'docs' / name).read_text())
    result = build(load('drive-expansion-provenance.json'), load('source-district-definitions.json'), load('source-note-associations.json'))
    Path(args.out).write_text(result)
    print(f'Generated metadata seed: {len(result)} characters')
