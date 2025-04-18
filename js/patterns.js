export const categories = {
  basics: {
    id: "basics",
    name: "Basics",
    description: "Basic patterns and structures.",
  },
  glider_synthesis: {
    id: "glider_synthesis",
    name: "Glider Synthesis",
    description: "Patterns that can be synthesized from gliders.",
    link: "https://conwaylife.com/wiki/Glider_synthesis",
  },
  guns: {
    id: "guns",
    name: "Guns",
    description: "Patterns that produce gliders.",
    link: "https://conwaylife.com/wiki/Gun",
  },
  methuselahs: {
    id: "methuselahs",
    name: "Methuselahs",
    description: "Patterns that takes a large number of generations in order to stabilize and becomes much larger than its initial configuration.",
    link: "https://conwaylife.com/wiki/Methuselah",
  },
  oscillators: {
    id: "oscillators",
    name: "Oscillators",
    description: "Patterns that repeat after a certain number of generations.",
    link: "https://conwaylife.com/wiki/Oscillator",
  },
  puffer_trains: {
    id: "puffer_trains",
    name: "Puffer Trains",
    description: "Patterns that move and leave a trail of debris.",
    link: "https://conwaylife.com/wiki/Puffer_train",
  },
  rakes: {
    id: "rakes",
    name: "Rakes",
    description: "A rake is a puffer whose debris consists of spaceships.",
    link: "https://conwaylife.com/wiki/Rake",
  },
  spaceships: {
    id: "spaceships",
    name: "Spaceships",
    description: "Patterns that move across the grid.",
    link: "https://conwaylife.com/wiki/Spaceship",
  },
  still_lifes: {
    id: "still_lifes",
    name: "Still Lifes",
    description: "Patterns that do not change over time.",
    link: "https://conwaylife.com/wiki/Still_life",
  },
  wicks: {
    id: "wicks",
    name: "Wicks",
    description: "A wick is a stable or oscillating linearly repeating pattern. The difference from an agar is that it is one-dimensional.",
    link: "https://conwaylife.com/wiki/Wick",
  },
  other: {
    id: "other",
    name: "Other",
  }
};

export const patterns = [
  {
    id: "r-pentomino",
    name: "R-Pentomino",
    category: categories.methuselahs.id,
    description: "A well-known pattern that evolves into a variety of shapes.",
    data: "b2o$2o$bo!",
  },
  {
    id: "acorn",
    name: "Acorn",
    category: categories.methuselahs.id,
    description: 'A methuselah with lifespan 5206',
    data: "bo$3bo$2o2b3o!",
  },
  {
    id: "acorn-synth",
    name: "Acorn Synth",
    category: categories.glider_synthesis.id,
    description: "Glider synthesis of an acorn.",
    data: "3bo$4bo$2b3o3b2o$7b2o$9bo2$3o$2bo$bo!",
  },
  {
    id: '101',
    name: '101',
    category: categories.oscillators.id,
    description: "A period 5 oscillator that was found by Achim Flammenkamp in 1994.",
    data: "4b2o6b2o4b$3bobo6bobo3b$3bo10bo3b$2obo10bob2o$2obobo2b2o2bobob2o$3bobobo2bobobo3b$3bobobo2bobobo3b$2obobo2b2o2bobob2o$2obo10bob2o$3bo10bo3b$3bobo6bobo3b$4b2o6b2o!",
  },
  {
    id: 'a-for-all',
    name: 'A for All',
    category: categories.oscillators.id,
    description: 'A period 6 oscillator found by Dean Hickerson in 1994.',
    data: "4b2o4b$3bo2bo3b$3b4o3b$bobo2bobob$o8bo$o8bo$bobo2bobob$3b4o3b$3bo2bo3b$4b2o!"
  },
  {
    id: 'average',
    name: 'Average',
    category: categories.oscillators.id,
    description: 'A period 5 oscillator in which the average number of live rotor cells is five (V), which is also the period.',
    data: "3b2o$4b3o$2bo4bo$bob4obo$bobo4bo2bo$2ob3o2bobobo$bobo4bo2bo$bob4obo$2bo4bo$4b3o$3b2o!",
  },
  {
    id: 'airforce',
    name: 'Airforce',
    category: categories.oscillators.id,
    description: "A period 7 oscillator in which the rotor consists of two copies of that used in the burloaferimeter",
    data: "7bo6b$6bobo5b$7bo6b2$5b5o4b$4bo5bob2o$3bob2o3bob2o$3bobo2bobo3b$2obo3b2obo3b$2obo5bo4b$4b5o5b2$6bo7b$5bobo6b$6bo!"
  },
  {
    id: 'ariesbetwixttwoblocks',
    name: 'Aries Betwixt Two Blocks',
    category: categories.still_lifes.id,
    description: 'The most common naturally-occurring 31-bit still life',
    data: "4bo$2obobob2o$2obobob2o$3bobo$3bobo$2obobob2o$o2bobo2bo$b2o3b2o!",
  },
  {
    id: 'glider',
    name: 'Glider',
    category: categories.spaceships.id,
    description: 'A small pattern that moves diagonally across the grid.',
    data: "bo$o$3o!",
  },
  {
    id: 'ants',
    name: 'Ants',
    category: categories.wicks.id,
    description: "An orthogonal period 5 lightspeed wick.",
    data: "2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o2b$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o!"
  },
  {
    id: 'spaceship',
    name: 'Spaceship',
    category: categories.spaceships.id,
    description: 'A pattern that moves across the grid.',
    data: "33bo$16bo15bobo$6bobo6bo5b2o8bo$6bo4bo4bob6o4b2o$6bob8o10bo2bob3o$9bo5bo7b4o4b3o$4b2o17b3obo$bo2b2o7b2o8b2o$bo2bo$o$bo2bo$bo2b2o7b2o8b2o$4b2o17b3obo$9bo5bo7b4o4b3o$6bob8o10bo2bob3o$6bo4bo4bob6o4b2o$6bobo6bo5b2o8bo$16bo15bobo$33bo!",
  },
  {
    id: 'anura',
    name: 'Anura',
    category: categories.spaceships.id,
    description: "A sparky 3c/7 orthogonal spaceship found by Dylan Chen on December 28, 2020.[1] It is the second elementary 3c/7 orthogonal spaceship, and the first not based on the spaghetti monster.",
    data: "9bo11bo$8b3o9b3o$10bo9bo$6bob2o11b2obo$6bo4b3o3b3o4bo$5bob3ob3o3b3ob3obo2$4b3ob4obo3bob4ob3o$4b2o7bo3bo7b2o$4b3o2bob2o5b2obo2b3o2$9bo2bo5bo2bo$9bo11bo$7b2o2bobo3bobo2b2o$7bo3b3o3b3o3bo$5b2o4bo2bobo2bo4b2o$3bob2obob2o2bobo2b2obob2obo$2b2obo3bo3bo3bo3bo3bob2o$bobo3b2o13b2o3bobo$b2o8bo7bo8b2o$2bo7b3o5b3o7bo$10b2obo3bob2o$2o2b2o5b3o3b3o5b2o2b2o$obo3bo5b2o3b2o5bo3bobo$4bob2o15b2obo$8bo13bo$bo5b3o11b3o5bo$7b2o13b2o$3bo23bo$5b2o17b2o$5b6o9b6o$6bobo13bobo$2b3o4b2o4bo4b2o4b3o$2b2o4b3o3b3o3b3o4b2o$3b2obo6bo3bo6bob2o$12bobobobo$11bob2ob2obo$11bob5obo$9b2o9b2o$8b2o11b2o$8bo13bo2$6bobo13bobo$9bo11bo$5bo3bo11bo3bo$5bo4bo9bo4bo$5bo4bo9bo4bo$6bo17bo$8b3o9b3o$8bo13bo2$8bo13bo$6bo17bo$8bo13bo!"
  },
  {
    id: "alternatewickstretcher",
    name: "Alternate Wick Stretcher",
    category: categories.wicks.id,
    description: "A slightly smaller form of wickstretcher",
    data: "26bobo9b$26bo2bo8b$10bo15bo3bo7b$9bobo18b2o6b$2bo4b3obo5bo14bo5b$bobo2bo4b2o3bobo7b2o2bob2o4b$bobo2bob2o3bo3bo8b3o2b3o3bo$2ob2obobob2o8bo12bo2b2o$bo4b2o4b2o3bob2o12b2o2bo$bob2o2bo3bobob2o2bob2ob3o11b$2bo3b3obobo2bo4bo3b3o11b$3b2o3bobo2bo5b2o12b2o2bo$5b2obob2obobo3bo13bo2b2o$5bob2obo2bob2o4bo4b3o2b3o3bo$11b2o7b2o4b2o2bob2o4b$32bo5b$30b2o6b$26bo3bo7b$26bo2bo8b$26bobo!"
  },
  {
    id: 'beacon',
    name: 'Beacon',
    description: 'A period-2 oscillator that flips between two states.',
    data: "2o$o$2b2o$2bo!",
  },
  {
    id: 'pulsar',
    name: 'Pulsar',
    category: categories.oscillators.id,
    description: 'A larger oscillator that creates a pulsating effect.',
    data: "2b2o$2b2o$o3b2o$o3b2o$ob2o$2b2o!",
  },
  {
    id: 'undefined',
    name: '?',
    description: 'A pattern that moves across the grid.',
    data: "bo$obo$obo$3o!",
  },
  {
    id: 'achimsp16',
    name: 'Achims p16',
    category: categories.oscillators.id,
    description: 'A period-16 oscillator that was found in July 1994 by Achim Flammenkamp. It is a 16-cell oscillator that has a period of 16 generations.',
    data: "7b2o4b$7bobo3b$2bo4bob2o2b$b2o5bo4b$o2bo9b$3o10b2$10b3o$9bo2bo$4bo5b2ob$2b2obo4bo2b$3bobo7b$4b2o!",
  },
  {
    id: 'pentadecathlon',
    name: 'Pentadecathlon',
    category: categories.oscillators.id,
    description: 'A period-15 oscillator that creates a complex pattern.',
    data: "bobo$obobo$obobo$obobo$bobo!",
  },
  {
    id: 'bHeptomino',
    name: 'B-Heptomino',
    category: categories.methuselahs.id,
    description: "A somewhat vigorous, commonly seen bit of fluff, which lends to Life's growth tendencies. This piece is used in PUFTRAIN, RAKE, RAKE2, RAKE3, BHEPTPUF, GUN46, TRACK, GUNSTAR, GUNSTAR2, GUNSTAR3, BI-GUN, and the p46, p54, and p100 shuttles in OSCSPN2 and OSCSPN3, and in many other patterns.",
    data: "ob2o$3o$bo!",
  },
  {
    id: 'biGun',
    name: 'Bi-Gun',
    category: categories.guns.id,
    description: 'Two-barrelled p46 glider gun',
    data: "16b3o$18bo$18bo$17bo$31b3o14b2o$17bo13bo17bo$18bo12bo$o17bo13bo$2o14b3o$32bo$31bo$31bo$31b3o!",
  },
  {
    id: 'bHeptpuff',
    name: 'B-Heptomino puffer',
    category: categories.puffer_trains.id,
    description: "An extension of PUFTRAIN, but at these lengths, the ends need to be hit by rakes. Even with the rakes, there are only a finite number of lengths that don\'t eventually self-destruct. For a stable dirty puffer, see LINEPUF.",
    data: "16b4o$15bo3bo12bo2bo$19bo16bo$15bo2bo13bo3bo$33b4o$12b3o2$11bo2bo14b2o$11bobo18bo$6bo20b2o4b2o$7bo18b2o6bo$5b3o17b2o7bo$26bo3bo2bo$31bo$bo$2bo7b2o13b2o5bo2bo$3o5b2ob2o11b4o8bo$8b4o12b2ob2o3bo3bo$9b2o15b2o5b4o3$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo2$8bo$8b2o$9b2o$8b2o4$8b2o$9b2o$8b2o$8bo3$9b2o15b2o5b4o$8b4o12b2ob2o3bo3bo$3o5b2ob2o11b4o8bo$2bo7b2o13b2o5bo2bo$bo$31bo$26bo3bo2bo$5b3o17b2o7bo$7bo18b2o6bo$6bo20b2o4b2o$11bobo18bo$11bo2bo14b2o2$12b3o$33b4o$15bo2bo13bo3bo$19bo16bo$15bo3bo12bo2bo$16b4o!",
  }
  // Add more patterns as needed
  // {
  //   id: 'newPattern',
  //   name: 'New Pattern',
  //   description: 'Description of the new pattern.',
  //   data: "data string representing the pattern in RLE format",
  //     #b - blank cell, # is number of cells, if no number, it is 1
  //     #o - live cell
  //     $ - new line
  //     ! - end of pattern
  // }
];

export default patterns;
