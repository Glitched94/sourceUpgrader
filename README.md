# sourceUpgrader

A script to be inserted in KoLMafia's breakfast that will check for any missing upgrade to your Source Terminal and apply what it can each day

# Development

First turn your TypeScript files into something KoLmafia can understand by running

```bash
 run build
```

Then you can automatically create symlinks to your built files by running

```bash
 run install-mafia
```

When you're developing you can have your files automatically rebuild by keeping

```bash
 run watch
```

running in the background. If you've already built symlinks, your up-to-date script can be run instantly by entering `sourceupgrader` into the KoLmafia CLI.
