# Hero video sources

The carousel uses six independent moving clips, each with a portrait export and
a matching poster. It no longer uses the combined hero.mp4 or hero-mobile.mp4.

- Automotive: Mixkit, “Close up of red sports car”, clip 63.
  https://mixkit.co/free-stock-video/close-up-of-red-sports-car-63/
  Source page checked 2026-10-11: Mixkit Stock Video Free License, commercial or
  personal use. The clip contains an actual camera move across the car body.
- Marine: Yunus Terk, Luxury Yacht Cruising in the Mediterranean Sea.
  https://www.pexels.com/video/luxury-yacht-cruising-in-the-mediterranean-sea-37524012/
- Aircraft: AP Vibes, Luxurious Private Jet with Blue Skies.
  https://www.pexels.com/video/luxurious-private-jet-with-blue-skies-28586471/
- Property: Gee Rich Augustin, Aerial Footage of a Mansion.
  https://www.pexels.com/video/aerial-footage-of-a-mansion-5744343/
- Luxury Watch: Mitchel Durfee, Slow Motion Video of Rolex Watch.
  https://www.pexels.com/video/slow-motion-video-of-rolex-watch-6230464/
- Art: Ludovic Delot, Classic Art Gallery with Renaissance Paintings (user-selected option 2).
  https://www.pexels.com/video/classic-art-gallery-with-renaissance-paintings-37273773/
  Red gallery walls and gilded frames. Portrait source is reframed as a right-hand
  collection panel on desktop, with its portrait composition retained on mobile. Illustrative
  cultural imagery only; not a claim that these works are privately owned,
  available for purchase or associated with ALPHA X.

Pexels license checked 2026-10-11: https://www.pexels.com/license/
Allows free website use and modification. Do not imply endorsement by depicted
brands or people. Footage is illustrative, not a representation of inventory.

Art direction: quiet luxury, private ownership, restrained blue/charcoal,
warm metallic highlights, polished materials and unhurried camera movement.
Art uses an eight-second collection film, preserving warm red and gold detail.
No animated stills. Four stories last 7 seconds at 24 fps, muted; the
approved automotive clip is unchanged.

Rebuild: `bash scripts/build-hero-clips.sh`. Raw source URLs, framing, slowing
and grading are recorded there. The five replacement stories are regenerated;
automotive exports are deliberately preserved. Sources cache in ignored footage/raw.
Pass story names to render a subset, e.g. `bash scripts/build-hero-clips.sh watch art`.
Gold exports are retained as unused local assets, not part of the carousel.
Watch and Art are lifestyle editorial copy, not statements of product eligibility.
