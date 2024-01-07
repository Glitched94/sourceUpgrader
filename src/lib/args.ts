import { Args } from "grimoire-kolmafia"

export const args = Args.create("upgradeSource", "A script to check for any missing Source Terminal upgrades, and extrude/install them.", {
    sim: Args.flag({
        setting: "",
        default: false,
        help: "Use this flag to see a simulated output of what the script will attempt to perform. Will say it is doing more than it can in a single day because the script relies on several Mafia prefs that we can't simulate the changes of."
    })
});