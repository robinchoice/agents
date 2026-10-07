#!/usr/bin/env bash
# Collect the agent setup and upload the dashboard into the volume of the Coolify service
# "agents" on VPS 3, which serves it as agents.pleasance.org (tailnet only).
# Started by agents-publish.path (rules, skills, settings) and agents-publish.timer (nightly).
set -euo pipefail
here=$(dirname "$(realpath "$0")")
out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT
cp -r "$here/site/." "$out/"
python3 "$here/collect.py" > "$out/data.json"
volume=$(ssh vps3 "docker volume inspect -f '{{.Mountpoint}}' ylcp43jvtrh3xba7dnfvddwk_agents-site")
rsync -rt --delete --chmod=D755,F644 "$out/" "vps3:$volume/"
echo "published $(date '+%F %T')"
