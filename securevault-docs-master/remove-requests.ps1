# Read the file
$content = Get-Content 'src\app\(app)\documents\page.tsx' -Raw

# Find the start and end of RequestsView function
$startPattern = 'function RequestsView\(\) \{'
$endPattern = '^\}\s*$'

# Split content into lines
$lines = $content -split "`n"
$newLines = @()
$skipMode = $false
$braceCount = 0
$functionStarted = $false

foreach ($line in $lines) {
    if ($line -match 'function RequestsView\(\)') {
        $skipMode = $true
        $functionStarted = $true
        $braceCount = 0
        continue
    }

    if ($skipMode) {
        # Count braces to find the end of the function
        $openBraces = ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $closeBraces = ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        $braceCount += $openBraces - $closeBraces

        if ($braceCount -le -1 -and $line -match '^\}') {
            $skipMode = $false
            continue
        }
        continue
    }

    $newLines += $line
}

# Write back
$newContent = $newLines -join "`n"
Set-Content 'src\app\(app)\documents\page.tsx' -Value $newContent -NoNewline
