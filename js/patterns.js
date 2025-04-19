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
    link: "https://conwaylife.com/wiki/Acorn"
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
    category: [ categories.spaceships.id, categories.basics.id ],
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
    category: [ categories.basics.id, categories.oscillators.id ],
    description: 'A period-2 oscillator that flips between two states.',
    data: "2o2b$o3b$3bo$2b2o!",
  },
  {
    id: 'pulsar',
    name: 'Pulsar',
    category: categories.oscillators.id,
    description: 'A larger oscillator that creates a pulsating effect.',
    data: "2b2o$2b2o$o3b2o$o3b2o$ob2o$2b2o!",
  },
  {
    id: 'eater-1',
    name: 'Eater (Fishhook)',
    category: [ categories.basics.id, categories.still_lifes.id ],
    description: "The first discovered eater and a 7-cell still life.",
    data: "2o2b$obob$2bob$2b2o!"
  },
  {
    id: 'undefined',
    name: '?',
    description: 'A pattern that moves across the grid.',
    data: "bo$obo$obo$3o!",
  },
  {
    id: "beacon-2-gliders",
    name: "Beacon hit by 2 gliders",
    description: "Beacon is hit by two gliders and shifts by (4,4), inverts phase and emits two pi-heptominoes that become a half-bakery and pairs of ponds, boats and blinkers.",
    category: categories.glider_synthesis.id,
    data: "bo$2bo$3o8$4b2o$4bo$7bo$6b2o2$15b2o$15bobo$15bo!",
  },
  {
    id: "achimsp16",
    name: "Achims p16",
    category: categories.oscillators.id,
    description: "A period-16 oscillator that was found in July 1994 by Achim Flammenkamp. It is a 16-cell oscillator that has a period of 16 generations.",
    data: "7b2o4b$7bobo3b$2bo4bob2o2b$b2o5bo4b$o2bo9b$3o10b2$10b3o$9bo2bo$4bo5b2ob$2b2obo4bo2b$3bobo7b$4b2o!",
  },
  {
    id: "pentadecathlon",
    name: "Pentadecathlon",
    category: categories.oscillators.id,
    description: "A period-15 oscillator that creates a complex pattern.",
    data: "bobo$obobo$obobo$obobo$bobo!",
    link: "https://conwaylife.com/wiki/Pentadecathlon"
  },
  {
    id: "b-heptomino",
    name: "B-Heptomino",
    category: categories.methuselahs.id,
    description: "A very common methuselah with lifespan 148 that often arises with the cell at top left shifted one space to the left, which does not affect the subsequent evolution.",
    data: "ob2o$3o$bo!",
    link: "https://conwaylife.com/wiki/B-heptomino"
  },
  {
    id: "blonk-tie",
    name: "Blonk Tie",
    category: categories.methuselahs.id,
    description: "Also known as block-tie-blinker or J, is a somewhat common methuselah. Lifespan 551 generations.",
    data: "2o$2o$2bo$2bo$2bo!",
    link: "https://conwaylife.com/wiki/Blonk-tie"
  },
  {
    id: "bunnies",
    name: "Bunnies",
    category: categories.methuselahs.id,
    description: "A methuselah and parent of rabbits with lifespan 17332.",
    data: "o5bob$2bo3bob$2bo2bobo$bobo!",
    link: "https://conwaylife.com/wiki/Bunnies"
  },
  {
    id: "c-heptonimo",
    name: "C-Heptomino",
    category: categories.methuselahs.id,
    description: "A methuselah that evolves in the same way as a B-heptomino after its second generation and thus evolves into three blocks, two gliders and a ship after 148 generations.",
    data: "b3o$3ob$bo!",
    link: "https://conwaylife.com/wiki/C-heptomino"
  },
  {
    id: "century",
    name: "Century",
    category: categories.methuselahs.id,
    description: "A hexomino. It is a common methuselah that evolves into three blocks and a blinker after 103 generations.",
    data: "2b2o$3ob$bo!",
    link: "https://conwaylife.com/wiki/Century"
  },
  {
    id: "die-hard",
    name: "Die Hard",
    category: categories.methuselahs.id,
    description: "A 7-cells methuselah that dies completely. It has lifespan 130.",
    data: "6bob$2o6b$bo3b3o!",
    link: "https://conwaylife.com/wiki/Die_hard"
  },
  {
    id: "die-hard-8",
    name: "Die Hard 8",
    category: categories.methuselahs.id,
    description: "A 8-cells methuselah that dies completely. It has lifespan 159.",
    data: "2bo$2o$bo2$bo2$3o!",
  },
  {
    id: "die-hard-pre",
    name: "Die Hard Pre",
    category: categories.methuselahs.id,
    description: "Die Hard predecessor. A variant that lasts 137 generations.",
    data: "b2o$b2o4$b3o$obo$bo!",
  },
  {
    id: "blom",
    name: "Blom",
    category: categories.methuselahs.id,
    description: "A methuselah with a lifespan of 23314 generations that was found by Dean Hickerson in July 2002. It stabilizes with 2740 cells.",
    data: "o10bo$b4o6bo$2b2o7bo$10bob$8bobo!",
    link: "https://conwaylife.com/wiki/Blom"
  },
  {
    id: "e-heptomino",
    name: "E-Heptomino",
    category: categories.methuselahs.id,
    description: "A semi-common heptomino named by John Conway. It stabilizes at generation 343, leaving behind four beehives, five blocks, one blinker and one escaping glider.",
    data: "b3o$2o$b2o!",
    link: "https://conwaylife.com/wiki/E-heptomino"
  },
  {
    id: "ed",
    name: "Ed",
    category: categories.methuselahs.id,
    description: "A methuselah with a lifespan of 30872 generations, discovered by Schneelocke on June 17, 2010, using Nathaniel Johnston's soup search script, at the time the third-largest pattern to be found this way after Fred and Edna.",
    data: "3bobobobo3bo3b3o$5b2o4bo2b3o2bo$bo2bobobo4bobo$2bobo2bobob2ob5o$3bobo6bob4o$2obobo7bob3o$o3bobo9bo$4b2obobo2b2obob2o$o7bobobo3bobo$4obo2bob3o2bo2bo$3bo3bobo3b2o3bo$2bobo5bo4b3o$b3o2b2obo3b3o2bo$2o5bo3bob3ob3o$4bo2b2ob2o7bo$o2bo2bo2b3o$4b5o2b2ob3obo$bo2bobo2bo2bo$3b2o3bo4bo$3bob3o3bobob4o!",
    link: "https://conwaylife.com/wiki/Ed"
  },
  {
    id: "f-heptomino",
    name: "F-Heptomino",
    category: categories.methuselahs.id,
    description: "A methuselah that evolves into three blocks, a tub, a pond, seven blinkers (one traffic light and half of an interchange), a beehive, a boat and a glider after 437 generations.",
    data: "2o$bo$bo$b3o!",
    link: "https://conwaylife.com/wiki/F-heptomino"
  },
  {
    id: "fred",
    name: "Fred",
    category: categories.methuselahs.id,
    description: 'A methuselah with a lifespan of 35426 generations, discovered by Schneelocke on May 15, 2010. The pattern is named after Dr. Fred Edison from the "Maniac Mansion" computer game, whose wife was also called "Edna".',
    data: "5bo8bo2b2o$bo5b6o2bobo$3b6ob2o2bobo$o2bo2b2obo3bo4b2o$obob3o2bobo6bo$bob4o2b3o5b2o$bo2b3ob2obob3o$o2bo4bo3bo6bo$b2o2b3o3bo3bo$obo3b2obo3bo2bobo$bo6bobo5b2o$6o2b3o2bo$2bo4b3o5bobo$2b2ob2o5bo3b3o$3bo2b4obobo2bob2o$o4bo6b2obobo$o2bo2b2obobo$bo5bo2bo2bobobo$b3ob2obo$ob3obo6bo3b2o!",
    link: "https://conwaylife.com/wiki/Fred"
  },
  {
    id: "gliders-by-dozen",
    name: "Gliders by the dozen",
    category: categories.methuselahs.id,
    description: "A methuselah with lifespan 184 that emits exactly 12 gliders over the course of its evolution.",
    data: "2o2bo$o3bo$o2b2o!",
    link: "https://conwaylife.com/wiki/Gliders_by_the_dozen"
  },
  {
    id: "herschel",
    name: "Herschel",
    category: categories.methuselahs.id,
    description: "A heptomino shaped like the lowercase letter h, which occurs at generation 20 of the B-heptomino.",
    data: "o2b$3o$obo$2bo!",
    link: "https://conwaylife.com/wiki/Herschel"
  },
  {
    id: "homer",
    name: "Homer",
    category: categories.methuselahs.id,
    description: "A methuselah with a lifespan of 42883 generations, discovered by Adam P. Goucher on November 30, 2018, using apgsearch. It was the longest-lasting known methuselah to fit within a 16×16 bounding box until the discovery of 47575M in February 2019.",
    data: "obo6b5obo$2b3obobob2o2bo$b2o2bobo2b2o3bo$2bobo2b2obo2b2o$o2bo4b3o3bo$3bob3obo$6obobob2obo$6b2ob2ob2o$2b3ob8o$3b2ob4o4b2o$6obo2bo2bo$bo3b3ob3o2b2o$5obo3bob2obo$2o6bo2bo$2ob3o2bob6o$2b2obobob2o2b2o!",
    link: "https://conwaylife.com/wiki/Homer"
  },
  {
    id: "i-heptomino",
    name: "I-Heptomino",
    category: categories.methuselahs.id,
    description: "The I-heptomino stabilises after 247 generations as three blocks, two gliders, a beehive, a boat, and a ship.",
    data: "2o$bo$b2o$2b2o!",
    link: "https://conwaylife.com/wiki/I-heptomino"
  },
  {
    id: "iwona",
    name: "Iwona",
    category: categories.methuselahs.id,
    description: "A methuselah with lifespan 28786. Found on August 20, 2004.",
    data: "14b3o3b6$2bo17b$3b2o15b$3bo14bob$18bob$18bob$19bo$18b2o$7b2o11b$8bo11b5$2o18b$bo!",
    link: "https://conwaylife.com/wiki/Iwona"
  },
  {
    id: "jaydot",
    name: "Jaydot",
    category: categories.methuselahs.id,
    description: "A 9-cell methuselah with a lifespan of 6929 generations found by Tanner Jacobi on March 10, 2014. Its name comes from the shape of the 10-cell parent.",
    data: "b2o$3o2$bo$b2o$o!",
    link: "https://conwaylife.com/wiki/Jaydot"
  },
  {
    id: "lidka",
    name: "Lidka",
    category: categories.methuselahs.id,
    description: "A methuselah with lifespan 29055. The 13-cell grandparent of the original Lidka with lifespan 29055 was found by David Bell. Incidentally, the 9-cell pattern in the lower right corner of this pattern, fitting in a 5×5 bounding box, is also a methuselah in its own right: it stabilizes after 595 generations to a constellation of 182 cells.",
    data: "bo7b$obo6b$bo7b8$8bo$6bobo$5b2obo2$4b3o!",
    link: "https://conwaylife.com/wiki/Lidka"
  },
  {
    id: "long-bun",
    name: "Long Bun",
    category: categories.methuselahs.id,
    description: "A somewhat common evolutionary sequence.",
    data: "bobo$o2b2o$o2bo!",
    link: "https://conwaylife.com/wiki/Long_bun"
  },
  {
    id: "multum-in-parvo",
    name: "Multum in Parvo",
    category: categories.methuselahs.id,
    description: "Multum in parvo (a great deal in a small space) is a methuselah found by Charles Corderman in 1972. Its lifespan is 3933. The stable pattern that results from multum in parvo (including 13 escaping gliders) has 633 cells.",
    data: "3b3o$2bo2bo$bo4b$o!",
    link: "https://conwaylife.com/wiki/Multum_in_parvo"
  },
  {
    id: "octomino-ii",
    name: "Octomino II",
    category: categories.methuselahs.id,
    description: "Octomino II is a semi-common evolutionary sequence that evolves into a diagonally symmetric constellation of two blocks, two blinkers, and a ship seen below after 116 generations.",
    data: "bo$3o$ob2o$3bo!",
    link: "https://conwaylife.com/wiki/Octomino_II"
  },
  {
    id: "pi-heptomino",
    name: "Pi-Heptomino",
    category: categories.methuselahs.id,
    description: "A common heptomino that stabilizes at generation 173, leaving behind six blocks, five blinkers and two ponds.",
    data: "3o$obo$obo!",
    link: "https://conwaylife.com/wiki/Pi-heptomino"
  },
  {
    id: "queen-bee",
    name: "Queen Bee",
    category: categories.methuselahs.id,
    description: "A pattern that lays a beehive on either side of itself before exploding. In 15 generations develops into a beehive and a reflected copy of itself.",
    data: "3bo3b$2bobo2b$bo3bob$2b3o2b$2o3b2o!",
    link: "https://conwaylife.com/wiki/Queen_bee"
  },
  {
    id: "r-turner",
    name: "R-Turner",
    category: categories.methuselahs.id,
    description: "Is the 18th most common qualifying sequence, appearing 28314 times with a relative frequency of 0.046. Lifespan 268 generations",
    data: "2b2o$4bo$o2bo$3o!",
    link: "https://conwaylife.com/wiki/R-turner"
  },
  {
    id: "switch-engine",
    name: "Switch Engine",
    category: categories.methuselahs.id,
    description: "A methuselah with lifespan 3911 that can be used to make c/12 diagonal puffers and spaceships.",
    data: "bobo2b$o5b$bo2bob$3b3o!",
    link: "https://conwaylife.com/wiki/Switch_engine"
  },
  {
    id: "thunderbird",
    name: "Thunderbird",
    category: categories.methuselahs.id,
    description: "A methuselah with lifespan 243.",
    data: "3o2$bob$bob$bo!",
    link: "https://conwaylife.com/wiki/Thunderbird"
  },
  {
    id: "two-glider-mess",
    name: "Two Glider Mess",
    category: categories.methuselahs.id,
    description: "A methuselah with a lifespan of 530 generations. It is the two-glider collision that takes the longest to stabilize.",
    data: "2bo$obo$b2o$7bo$5b2o$6b2o!",
    link: "https://conwaylife.com/wiki/Two-glider_mess"
  },
  {
    id: "u-turner",
    name: "U-Turner",
    category: categories.methuselahs.id,
    description: "A somewhat common methuselah. While it had appeared in some tables of common sequences, it was not recognized as a distinct object until May 4, 2021",
    data: "b3o$b3o$obo$2o!",
    link: "https://conwaylife.com/wiki/U-turner"
  },
  {
    id: "wilma",
    name: "Wilma",
    category: categories.methuselahs.id,
    description: "As of late October 2018, the longest-lived known methuselah in a 20x20 bounding box. Lifespan: 39693 generations; initial population: 197; final population: 3524.",
    data: "o2bob2o2bobo2bo$2o2b2ob3obob2o2b3o$b2o2bo3bob6o$2obo4b4obo3b2o$obob2obo2b3ob5o$b2ob3ob4o2b2ob3o$b2o6bo2b5ob2o$bo6bobob3obo2bo$o3bob3ob3o3bobo$b2o2b2obob3o$b4o3bo4b2obo$2o2b6obo5bobo$bob3ob3obobo4bo$obobobobo3b3o3b2o$2obobob2o3b2ob4o$ob2ob2o6bobo2bo$o3b2ob2ob2obo4bo$7o6bo4bo$2b2obo7b2o2b3o$o3b3o2bo3b3o2bo!",
    link: "https://conwaylife.com/wiki/Wilma"
  },
  {
    id: 'wing',
    name: 'Wing',
    category: categories.methuselahs.id,
    description: "An induction coil.",
    data: "b2ob$o2bo$bobo$2b2o!",
    link: "https://conwaylife.com/wiki/Wing"
  },
  {
    id: "m-52513",
    name: "52513M",
    category: categories.methuselahs.id,
    description: "a methuselah with a lifespan of 52513 generations, discovered by Dylan Chen on January 16, 2021.",
    data: "3o2b2obob2ob3o$2obob3o4bobo$bo2bo2bobob3obo$2bo2b2o3bo2bo$2bo5bobo3b2o$o4b2o3b3obo$3b2o2bo2bobo2bo$2b4obo2bob2o$2ob2o2b2o5b2o$ob4obo4b3o$o3b4o2b3o$b10o2b3o$2o3bob3obob3o$b2ob6o3bobo$obo5b4obo$3obobob2o5bo!",
    link: "https://conwaylife.com/wiki/52513M"
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
  },
  {
    id: "backward-space-rake",
    name: "Backward Space Rake",
    category: categories.rakes.id,
    description: "A simple orthogonal backward glider rake with period 20 and speed c/2.",
    data: "12b2o5b4o$10b2ob2o3bo3bo$10b4o8bo$11b2o5bo2bob2$9bo13b$8b2o8b2o3b$7bo9bo2bo2b$8b5o4bo2bo2b$9b4o3b2ob2o2b$12bo4b2o4b4$19b4o$18bo3bo$b4o17bo$o3bo13bo2bob$4bo18b$o2bo!"
  }
  // Add more patterns as needed
  // {
  //   id: 'newPattern',
  //   name: 'New Pattern',
  //   description: 'Description of the new pattern.',
  //   data: "data string representing the pattern in RLE format",
  //     #b - blank cell, # is number of cells, if no number, it is 1
  //     #o - live cell, # is number of cells, if no number, it is 1
  //     #$ - new line, # is number of cells, if no number, it is 1
  //     ! - end of pattern
  // }
];

export default patterns;