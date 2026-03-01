#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <remote-name-or-url> [repo-path]" >&2
  echo "Example: $0 origin ." >&2
  exit 1
fi

REMOTE="$1"
REPO_PATH="${2:-.}"

resolve_default_branch() {
  local remote="$1"

  local symref_output
  symref_output="$(git -C "$REPO_PATH" ls-remote --symref "$remote" HEAD 2>/dev/null || true)"

  local branch
  branch="$(awk '/^ref:/ {sub("refs/heads/", "", $2); print $2; exit}' <<<"$symref_output")"

  if [[ -n "$branch" ]]; then
    printf '%s\n' "$branch"
    return 0
  fi

  local heads_output
  heads_output="$(git -C "$REPO_PATH" ls-remote --heads "$remote" 2>/dev/null || true)"

  if awk '{print $2}' <<<"$heads_output" | grep -qx 'refs/heads/main'; then
    printf 'main\n'
    return 0
  fi

  if awk '{print $2}' <<<"$heads_output" | grep -qx 'refs/heads/master'; then
    printf 'master\n'
    return 0
  fi

  awk 'NR==1 {sub("refs/heads/", "", $2); print $2}' <<<"$heads_output"
}

DEFAULT_BRANCH="$(resolve_default_branch "$REMOTE")"

if [[ -z "$DEFAULT_BRANCH" ]]; then
  echo "Unable to determine the default branch for '$REMOTE'." >&2
  exit 2
fi

echo "Fetching $REMOTE/$DEFAULT_BRANCH"
git -C "$REPO_PATH" fetch "$REMOTE" --quiet --no-tags "$DEFAULT_BRANCH"
