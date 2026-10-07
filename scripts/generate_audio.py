#!/usr/bin/env python3
"""Render the campus sound bank offline for auditioning. No network or packages required.

The app does not fetch these files. web-src/b_audio.js synthesizes the same seven recipes (plus footstep
variants per surface, district beds and every one-shot) in Web Audio at runtime. Keep the two in step:
change a recipe here and in RECIPES there together.
"""
import math
import random
import wave
import struct
from pathlib import Path

RATE = 22050
OUT = Path(__file__).resolve().parents[1] / 'web' / 'audio'

def render(name, seconds, fn):
    rng = random.Random(713 + sum(map(ord, name)))
    samples = [fn(i / RATE, rng, seconds) for i in range(round(seconds * RATE))]
    peak = max(abs(v) for v in samples) or 1
    scale = min(1, .88 / peak)
    data = b''.join(struct.pack('<h', round(max(-1, min(1, v * scale)) * 32767)) for v in samples)
    with wave.open(str(OUT / (name + '.wav')), 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes(data)

def envelope(t, duration, attack=.015, release=.1):
    return min(1, t / attack, max(0, (duration - t) / release))

def chime(t, rng, duration):
    return envelope(t, duration) * sum(.18 * math.sin(2 * math.pi * f * t) * math.exp(-5 * max(0, t-delay)) * (t >= delay) for f, delay in [(523.25, 0), (783.99, .09), (1046.5, .18)])

def complete(t, rng, duration):
    return envelope(t, duration) * sum(.12 * math.sin(2 * math.pi * f * t) * math.exp(-3 * max(0, t-delay)) * (t >= delay) for f, delay in [(293.66, 0), (440, .12), (587.33, .24), (880, .36)])

def step(t, rng, duration):
    # A sole impact, low body and gravel tail; bounded random transient.
    return envelope(t, duration, .003, .06) * (.5 * rng.uniform(-1, 1) * math.exp(-35*t) + .26 * math.sin(2*math.pi*85*t)*math.exp(-25*t) + .08*rng.uniform(-1, 1)*math.exp(-10*t))

def transition(t, rng, duration):
    f = 42 + 170 * (1-t/duration)**3
    phase = 2*math.pi*(42*t + 170*(t-1.5*t*t/duration+t**3/duration**2-t**4/(4*duration**3)))
    return envelope(t, duration, .03, .7)*(.42*math.sin(phase)*math.exp(-1.6*t)+.08*rng.uniform(-1,1)*math.sin(math.pi*t/duration))

def pink_loop(seconds, seed):
    """Pink noise with the tail crossfaded into the head: a seamless, audible wind loop."""
    rng = random.Random(seed)
    n, fade = round(seconds * RATE), round(.5 * RATE)
    raw, b0, b1, b2 = [], 0.0, 0.0, 0.0
    for _ in range(n + fade):
        w = rng.uniform(-1, 1)
        b0 = .99765 * b0 + w * .099046
        b1 = .963 * b1 + w * .2965164
        b2 = .57 * b2 + w * 1.0526913
        raw.append((b0 + b1 + b2 + w * .1848) * .2)
    out = raw[:n]
    for i in range(fade):
        k = i / fade * math.pi / 2
        out[i] = raw[n + i] * math.cos(k) + raw[i] * math.sin(k)
    return out

def write(name, samples, peak_to=.88):
    peak = max(abs(v) for v in samples) or 1
    scale = min(1, peak_to / peak)
    data = b''.join(struct.pack('<h', round(max(-1, min(1, v * scale)) * 32767)) for v in samples)
    with wave.open(str(OUT / (name + '.wav')), 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes(data)

def hum(t, rng, duration):
    # 220, 330 and 440.125 Hz complete whole cycles in 8 s: a continuous loop point that phone speakers can reproduce.
    # (The first version used 55-110 Hz and 6-17 Hz partials, which were inaudible on phones.)
    return (.05*math.sin(2*math.pi*220*t) + .032*math.sin(2*math.pi*330*t)*(1+.35*math.sin(2*math.pi*t/4))
            + .018*math.sin(2*math.pi*440.125*t)*(1+.5*math.sin(2*math.pi*t/8)))

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    write('campus-air', pink_loop(4, 713), .7)
    render('district-hum', 8, hum)
    render('footstep', .26, step)
    render('ui', .14, lambda t,r,d: .25*math.sin(2*math.pi*740*t)*envelope(t,d,.004,.09)*math.exp(-12*t))
    render('notification', .9, chime)
    render('complete', 1.6, complete)
    render('transition', 2.4, transition)
    print('Rendered seven audition WAVs at 22.05 kHz. The app synthesizes these at runtime and does not fetch them.')
