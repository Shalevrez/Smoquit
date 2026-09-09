# The icon

`icon.svg` is the source for the four PNGs that sit in the repository root
and get served as-is: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
(180) and, from `icon-maskable.svg`, `icon-maskable-512.png`. Those PNGs are
listed in `scripts/protected.mjs` — the build never writes them, so changing
the icon means re-rendering by hand and committing the result.

The drawing: an ember sky, a pale sun cut by the horizon, and smoke leaving
the sun in the shape of an S that fades out as it rises. The S is built from
two tangent circles rather than freehand curves, so it turns the way the
letter turns — lower bowl bulging right, upper bowl bulging left, meeting at
a waist on the centre line. Drawn freehand it read as a wiggle instead.

`icon-maskable.svg` is the same drawing at 80%, because Android crops a
maskable icon to whatever shape the launcher uses and only the middle 80%
is guaranteed to survive. The sky bleeds to the edge in both.

## Re-rendering

Any SVG rasteriser will do. With the Chromium that Playwright installs:

    # 1024 first, then downsample — the curves come out cleaner that way.
    sed 's/width="512" height="512"/width="1024" height="1024"/' icon.svg > /tmp/i.svg
    chromium --headless --window-size=1200,1200 --screenshot=/tmp/i.png \
             --force-device-scale-factor=1 /tmp/i.svg

The window is deliberately larger than the image: the viewport is not
exactly the window size, and the page background otherwise shows up as a
band along the bottom edge. Crop to 1024×1024 from the top left, then
resize to 512, 192 and 180 and save as opaque RGB PNG.
