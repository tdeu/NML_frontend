import os
import json
from pathlib import Path

def analyze_package_json(file_path):
    """Analyze a package.json file and return its dependencies"""
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            deps = {
                'dependencies': data.get('dependencies', {}),
                'devDependencies': data.get('devDependencies', {})
            }
            return deps
    except Exception as e:
        return f"Error reading {file_path}: {str(e)}"

def check_node_modules(path):
    """Check if node_modules exists and get its size"""
    node_modules = os.path.join(path, 'node_modules')
    if os.path.exists(node_modules):
        total_size = sum(
            os.path.getsize(os.path.join(dirpath, filename))
            for dirpath, _, filenames in os.walk(node_modules)
            for filename in filenames
        )
        return True, total_size / (1024 * 1024)  # Size in MB
    return False, 0

def analyze_project(root_path):
    """Analyze the Scaffold-ETH project structure"""
    print(f"\n{'='*50}")
    print("Scaffold-ETH Project Analysis")
    print(f"{'='*50}\n")
    
    # Check root package.json
    print("ROOT DIRECTORY ANALYSIS:")
    root_pkg = os.path.join(root_path, 'package.json')
    if os.path.exists(root_pkg):
        print("✓ Root package.json found")
        deps = analyze_package_json(root_pkg)
        print(f"- Dependencies count: {len(deps['dependencies'])}")
        print(f"- DevDependencies count: {len(deps['devDependencies'])}")
    else:
        print("✗ No root package.json found")
    
    has_modules, size = check_node_modules(root_path)
    print(f"- Root node_modules: {'Present' if has_modules else 'Missing'}")
    if has_modules:
        print(f"- Root node_modules size: {size:.2f} MB")

    # Check NextJS package
    print("\nNEXTJS PACKAGE ANALYSIS:")
    nextjs_path = os.path.join(root_path, 'packages', 'nextjs')
    if os.path.exists(nextjs_path):
        print("✓ NextJS package found")
        
        # Check package.json
        nextjs_pkg = os.path.join(nextjs_path, 'package.json')
        if os.path.exists(nextjs_pkg):
            deps = analyze_package_json(nextjs_pkg)
            print(f"- Dependencies count: {len(deps['dependencies'])}")
            print(f"- DevDependencies count: {len(deps['devDependencies'])}")
        
        # Check node_modules
        has_modules, size = check_node_modules(nextjs_path)
        print(f"- NextJS node_modules: {'Present' if has_modules else 'Missing'}")
        if has_modules:
            print(f"- NextJS node_modules size: {size:.2f} MB")
        
        # Check key directories
        dirs_to_check = ['app', 'components', 'public']
        for dir_name in dirs_to_check:
            path = os.path.join(nextjs_path, dir_name)
            if os.path.exists(path):
                file_count = sum(len(files) for _, _, files in os.walk(path))
                print(f"- {dir_name}/: {file_count} files")
            else:
                print(f"✗ {dir_name}/ directory missing")
    else:
        print("✗ NextJS package not found")

    # Check Hardhat package
    print("\nHARDHAT PACKAGE ANALYSIS:")
    hardhat_path = os.path.join(root_path, 'packages', 'hardhat')
    if os.path.exists(hardhat_path):
        print("✓ Hardhat package found")
        
        # Check package.json
        hardhat_pkg = os.path.join(hardhat_path, 'package.json')
        if os.path.exists(hardhat_pkg):
            deps = analyze_package_json(hardhat_pkg)
            print(f"- Dependencies count: {len(deps['dependencies'])}")
            print(f"- DevDependencies count: {len(deps['devDependencies'])}")
        
        # Check node_modules
        has_modules, size = check_node_modules(hardhat_path)
        print(f"- Hardhat node_modules: {'Present' if has_modules else 'Missing'}")
        if has_modules:
            print(f"- Hardhat node_modules size: {size:.2f} MB")
        
        # Check contracts
        contracts_path = os.path.join(hardhat_path, 'contracts')
        if os.path.exists(contracts_path):
            contract_files = [f for f in os.listdir(contracts_path) if f.endswith('.sol')]
            print(f"- Found {len(contract_files)} Solidity contracts")
        else:
            print("✗ contracts/ directory missing")
    else:
        print("✗ Hardhat package not found")

    # Check for common issues
    print("\nCOMMON ISSUES CHECK:")
    
    # Check for multiple yarn.lock/package-lock.json
    lock_files = []
    for root, _, files in os.walk(root_path):
        for file in files:
            if file in ['yarn.lock', 'package-lock.json']:
                lock_files.append(os.path.join(root, file))
    
    if len(lock_files) > 1:
        print("⚠ Multiple lock files found:")
        for f in lock_files:
            print(f"  - {os.path.relpath(f, root_path)}")
    
    # Check for .env files
    env_files = []
    for root, _, files in os.walk(root_path):
        for file in files:
            if file == '.env':
                env_files.append(os.path.join(root, file))
    
    print(f"\nFound {len(env_files)} .env files:")
    for f in env_files:
        print(f"  - {os.path.relpath(f, root_path)}")

if __name__ == "__main__":
    # Use current directory as root path
    current_dir = os.getcwd()
    analyze_project(current_dir)