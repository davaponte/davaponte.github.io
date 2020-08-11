#!/bin/python3
#-*- coding: utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

def GenerateImage(texts, imageName):
 
	size = (900, 120)
	 
	img = Image.new('RGBA', size)# , color = (73, 109, 137))
	 
	font = ImageFont.truetype('DejaVuSans.ttf', 48)

	widths = []
	heights = []
	for t in texts:
		widths.append(font.getsize(t)[0])
		heights.append(font.getsize(t)[1])
		
	maxwidth = max(k for k in widths)

	height = font.getsize(texts[0])[1]
	maxheight = sum(heights)

	line = 0
	deltaY = 0
	for t in texts:
		d = ImageDraw.Draw(img)
		pos = ((size[0] - widths[line]) // 2, (size[1] - maxheight) // 2 + line * deltaY)
		
		backpos = (pos[0] + 2, pos[1] + 2)
		d.text(backpos, t, font=font, fill=(0, 0, 0))
		d.text(pos, t, font=font, fill=(255, 255, 0))
		deltaY = heights[line]
		line += 1
	 
	img.save(imageName)

def TCtoSeconds(st):
	leftpart = str(int(st[:2]) * 3600 + int(st[3:5]) * 60 + int(st[6:8]))
	rightpart = st[9:12]
	return leftpart.zfill(5) + '.' + rightpart.zfill(3)

from itertools import groupby
# "chunk" our input file, delimited by blank lines

filename = 'Cosmos.Possible.Worlds.S01E01.Ladder.to.the.Stars.480p.x264.srt'
#~ filename = 'The Beatles - Don\'t let me down.srt';
with open(filename) as f:
    res = [list(g) for b,g in groupby(f, lambda x: bool(x.strip())) if b]

#~ print(res)

from collections import namedtuple

Subtitle = namedtuple('Subtitle', 'number start end content')

subs = []

for sub in res:
    if len(sub) >= 3: # not strictly necessary, but better safe than sorry
        sub = [x.strip() for x in sub]
        number, start_end, *content = sub # py3 syntax
        start, end = start_end.split(' --> ')
        subs.append(Subtitle(number, start, end, content))

js = 'var subtitles = [\n'

for k in subs:
	StartTC = TCtoSeconds(k.start)
	StopTC = TCtoSeconds(k.end)
	imagen = StartTC + '-' + StopTC + '.png'
	#~ print(k.number, k.start, k.end, k. content, imagen)
	GenerateImage(k.content, 'images/' + imagen)
	js = js + '  {start: ' + str(float(StartTC)) + ', stop: ' + str(float(StopTC)) + ', img: "' + imagen + \
		'", texts: ' + str(k.content) + '},\n' 
 
js = js[:-2] + '\n];'
print(js)
