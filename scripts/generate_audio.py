#!/usr/bin/env python3
"""Render original deterministic PCM sound design. No network or packages required."""
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

def air(t, rng, duration):
    # Exact-period sines make loop boundaries continuous. High frequency noise is deliberately absent.
    return .08*math.sin(2*math.pi*47/duration*t)+.035*math.sin(2*math.pi*83/duration*t)+.015*math.sin(2*math.pi*139/duration*t)*(1+.2*math.sin(2*math.pi*t/duration))

def hum(t, rng, duration):
    return .06*math.sin(2*math.pi*440/duration*t)+.03*math.sin(2*math.pi*660/duration*t)+.025*math.sin(2*math.pi*881/duration*t)

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    render('campus-air', 8, air)
    render('district-hum', 8, hum)
    render('footstep', .26, step)
    render('ui', .14, lambda t,r,d: .25*math.sin(2*math.pi*740*t)*envelope(t,d,.004,.09)*math.exp(-12*t))
    render('notification', .9, chime)
    render('complete', 1.6, complete)
    render('transition', 2.4, transition)
    print('Rendered seven original mono PCM WAVs at 22.05 kHz.')
