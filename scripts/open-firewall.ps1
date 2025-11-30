# Run this script as Administrator to open dev ports for Vite and the backend
# Usage: Right-click -> Run with PowerShell (Admin) or run from elevated PowerShell

$ports = @(5173, 5000)
foreach ($p in $ports) {
    $name = "DAWAKHANA-Allow-Port-$p"
    if (-not (Get-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue)) {
        New-NetFirewallRule -DisplayName $name -Direction Inbound -LocalPort $p -Protocol TCP -Action Allow
        Write-Host "Created firewall rule: $name (port $p)"
    } else {
        Write-Host "Firewall rule already exists: $name"
    }
}

Write-Host "Done. If ports are still unreachable, ensure your network profile is Private and that no router/NAT is blocking traffic."