# Commit (and optionally push) as the Vercel Hobby owner.
# Cursor/GitHub can stay logged in as huzairul — only the git Author field changes.
#
# Usage (from repo root):
#   powershell -ExecutionPolicy Bypass -File scripts/commit-as-owner.ps1 -Message "Your message"
#   powershell -ExecutionPolicy Bypass -File scripts/commit-as-owner.ps1 -Empty -Push
#
# Override identity if Vercel still blocks:
#   $env:OWNER_GIT_NAME = "Rakanlabs"
#   $env:OWNER_GIT_EMAIL = "the-email-on-the-GitHub-account-linked-to-Vercel"

param(
  [string]$Message = "",
  [switch]$Empty,
  [switch]$Push
)

$ErrorActionPreference = "Stop"

$ownerName = if ($env:OWNER_GIT_NAME) { $env:OWNER_GIT_NAME } else { "Rakanlabs" }
$ownerEmail = if ($env:OWNER_GIT_EMAIL) {
  $env:OWNER_GIT_EMAIL
} else {
  "admin@rakanlabs.my"
}

function Invoke-OwnerGit {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
  & git -c "user.name=$ownerName" -c "user.email=$ownerEmail" @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed"
  }
}

$staged = git diff --cached --name-only
if ($LASTEXITCODE -ne 0) { throw "git diff failed" }

if ($Empty) {
  if (-not $Message) { $Message = "Trigger deploy as owner" }
  Invoke-OwnerGit commit --allow-empty -m $Message
}
elseif ($staged) {
  if (-not $Message) { throw "Pass -Message when committing staged files." }
  Invoke-OwnerGit commit -m $Message
}
else {
  throw "Nothing staged. git add the files first, or pass -Empty to trigger a deploy."
}

Write-Host "Committed as $ownerName <$ownerEmail>"
git log -1 --format="Author: %an <%ae>%nCommit: %h %s"

if ($Push) {
  git push origin HEAD
  if ($LASTEXITCODE -ne 0) { throw "git push failed" }
  Write-Host "Pushed. GitHub login can stay huzairul; Vercel should see the owner author."
}
