import { Args } from "grimoire-kolmafia";
import { args } from "./lib/args";
import { $item, $items, SourceTerminal, get } from "libram";
import { Item, buy, itemAmount, print, use } from "kolmafia";

const enhFiles = $items`Source terminal file: critical.enh, Source terminal file: damage.enh, Source terminal file: substats.enh`;
const enqFiles = $items`Source terminal file: protect.enq, Source terminal file: stats.enq`;
const eduFiles = $items`Source terminal file: compress.edu, Source terminal file: duplicate.edu, Source terminal file: portscan.edu, Source terminal file: turbo.edu`;
const extFiles = $items`Source terminal file: gram.ext, Source terminal file: pram.ext, Source terminal file: spam.ext, Source terminal file: cram.ext, Source terminal file: dram.ext, Source terminal file: tram.ext, Source terminal file: familiar.ext`;

const singleUseChips = $items`Source terminal CRAM chip, Source terminal DRAM chip, Source terminal TRAM chip, Source terminal INGRAM chip, Source terminal DIAGRAM chip, Source terminal ASHRAM chip, Source terminal SCRAM chip, Source terminal TRIGRAM chip`;

const sourceEssence = $item`Source essence`;
const autoBuyLimit = get("autoBuyPriceLimit");

export default function main(command: string): void {
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  print("Attempting to upgrade Source Terminal...", "blue");

  // Check for, buy, and use all "Source terminal file" items
  enhance();
  enquiry();
  educate();
  extrude();

  // Install all single-use chips
  const installedChips = get("sourceTerminalChips").split(',');
  singleUseChips.forEach((chip) => {
    var chipName = chip.name.split(' ')[2];
    if (!installedChips.includes(chipName)) {
      if (args.sim) {
        print(`Sim: Buying 1 ${chip} @${autoBuyLimit}`);
        print(`Sim: Using 1 ${chip}`);
      } else {
        if (buy(1, chip, autoBuyLimit) !== 0) {
          use(1, chip);
        }
      }
    }
  });

  // GRAM
  const gramCount = get("sourceTerminalGram");
  buyAndUseMultiChips($item`Source terminal GRAM chip`, gramCount)

  // PRAM
  const pramCount = get("sourceTerminalPram");
  buyAndUseMultiChips($item`Source terminal PRAM chip`, pramCount);

  // SPAM
  const spamCount = get("sourceTerminalSpam");
  buyAndUseMultiChips($item`Source terminal SPAM chip`, spamCount);
}

function enhance(): void {
  var enhanceKnown = get("sourceTerminalEnhanceKnown").split(',');
  buyAndUseFiles(enhFiles, enhanceKnown);
}

function enquiry(): void {
  var enquiryKnown = get("sourceTerminalEnquiryKnown").split(',');
  buyAndUseFiles(enqFiles, enquiryKnown);
}

function educate(): void {
  var educateKnown = get("sourceTerminalEducateKnown").split(',');
  buyAndUseFiles(eduFiles, educateKnown);
}

function extrude(): void {
  var extrudeKnown = get("sourceTerminalExtrudeKnown").split(',');
  buyAndUseFiles(extFiles, extrudeKnown);
}

function buyAndUseFiles(files: Item[], names: string[]): void {
  files.forEach((file) => {
    var fileName = file.name.split(' ')[3];
    if (!names.includes(fileName)) {
      if (args.sim) {
        print(`Sim: Buying 1 ${file} @${autoBuyLimit}`);
        print(`Sim: Using 1 ${file}`);
      } else {
        if (buy(1, file, autoBuyLimit) !== 0) {
          use(1, file);
        }
      }
    }
  });
}

function buyAndUseMultiChips(chip: Item, currentCount: number): void {
  if (get("_sourceTerminalExtrudes") === 3) return;
  if (currentCount === 10) return;
  if (itemAmount(sourceEssence) < 100) return;

  const chipsNeeded = Math.min(3, 10 - currentCount);
  let i = 0;
  while (i < chipsNeeded && itemAmount(sourceEssence) >= 100 && get("_sourceTerminalExtrudes") < 3) {
    if (args.sim) {
      print(`Sim: extruding a ${chip}`);
    } else {
      SourceTerminal.extrude(chip);
    }
    i++;
  }

  if (args.sim) {
    print(`Sim: using ${i} ${i > 1 ? chip.plural : chip.name}`);
  } else {
    use(i, chip);
  }
}