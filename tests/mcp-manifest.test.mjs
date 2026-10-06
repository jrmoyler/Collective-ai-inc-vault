import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// The deployed vault-mcp function bundles its own copy of the tool list. Both must match, or remote clients miss tools.
test('local and deployed MCP tool manifests are identical',()=>{
 assert.equal(fs.readFileSync('supabase/functions/vault-mcp/tools.json','utf8'),fs.readFileSync('mcp/tools.json','utf8'));
});
