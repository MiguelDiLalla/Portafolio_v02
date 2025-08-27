import os
from datetime import datetime
import time
import sys
import pathspec

def get_time_diff(timestamp):
    now = time.time()
    diff = now - timestamp
    
    # Convert to different time units
    minutes = int(diff / 60)
    hours = int(minutes / 60)
    days = int(hours / 24)
    
    if days > 0:
        return f"{days} days ago"
    elif hours > 0:
        return f"{hours} hours ago"
    elif minutes > 0:
        return f"{minutes} minutes ago"
    else:
        return "just now"

def build_gitignore_spec(root_dir):
    """
    Parse .gitignore file and return pathspec object with gitignore content for documentation.
    
    Returns:
        tuple: (pathspec_object, gitignore_content_list)
    """
    gitignore_path = os.path.join(root_dir, '.gitignore')
    gitignore_content = []
    patterns = ['.git/']  # Always ignore .git folder
    
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r', encoding='utf-8') as f:
            for line in f:
                original_line = line.rstrip('\n')
                gitignore_content.append(original_line)
                
                # Add non-empty, non-comment lines to patterns
                stripped_line = line.strip()
                if stripped_line and not stripped_line.startswith('#'):
                    patterns.append(stripped_line)
    
    # Use gitwildmatch to match gitignore semantics (supports negations, wildcards, etc.)
    spec = pathspec.PathSpec.from_lines('gitwildmatch', patterns)
    return spec, gitignore_content

def should_ignore(path, root, spec):
    """
    Check if a path should be ignored based on pathspec and .git directory check.
    
    Args:
        path: Full path to check
        root: Root directory for relative path calculation
        spec: pathspec.PathSpec object for gitignore patterns
    
    Returns:
        bool: True if path should be ignored
    """
    # Always ignore .git directory explicitly
    if '.git' in path.split(os.sep):
        return True
        
    if spec:
        # Use POSIX-style relative path for cross-platform matching
        rel_path = os.path.relpath(path, root).replace('\\', '/')
        return spec.match_file(rel_path)
    return False

def create_folder_tree(use_gitignore=True):
    try:
        # Get the directory where the script is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        if not current_dir:  # fallback if __file__ doesn't work
            current_dir = os.getcwd()
            
        print(f"Scanning directory: {current_dir}")
        output_file = os.path.join(current_dir, 'folder_tree.txt')
        
        # Get ignore patterns and gitignore content if needed
        if use_gitignore:
            ignore_spec, gitignore_content = build_gitignore_spec(current_dir)
            print(f"Using gitignore patterns")
        else:
            ignore_spec = pathspec.PathSpec.from_lines('gitwildmatch', ['.git/'])
            gitignore_content = []
            print(f"Only ignoring .git folder")
        
        file_count = 0
        dir_count = 0
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"Folder tree generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Root: {current_dir}\n")
            f.write(f"Using gitignore: {use_gitignore}\n")
            
            # Document gitignore content if available
            if gitignore_content:
                f.write(f"\n.gitignore contents:\n")
                f.write("=" * 40 + "\n")
                for line in gitignore_content:
                    f.write(f"{line}\n")
                f.write("=" * 40 + "\n")
            f.write("\n")
            
            for root, dirs, files in os.walk(current_dir):
                # Filter out ignored directories
                dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), current_dir, ignore_spec)]
                
                # Calculate level for indentation
                level = root[len(current_dir):].count(os.sep)
                indent = '│   ' * level
                
                # Write directory name
                dir_name = os.path.basename(root)
                if level > 0:
                    try:
                        last_mod = os.path.getmtime(root)
                        f.write(f"{indent}├── 📁 {dir_name} ({get_time_diff(last_mod)})\n")
                        dir_count += 1
                    except Exception as e:
                        print(f"Error processing directory {dir_name}: {e}")
                
                # Filter and write files
                filtered_files = [f for f in sorted(files) 
                                if not should_ignore(os.path.join(root, f), current_dir, ignore_spec)]
                
                # Only proceed if there are files to process
                if filtered_files:
                    subindent = '│   ' * (level + 1)
                    for i, file in enumerate(filtered_files):
                        try:
                            file_path = os.path.join(root, file)
                            last_mod = os.path.getmtime(file_path)
                            
                            # Check if this is the last file in the filtered list
                            if i == len(filtered_files) - 1:
                                # Last file uses └── symbol with correct indentation
                                f.write(f"{subindent}└── 📄 {file} ({get_time_diff(last_mod)})\n")
                            else:
                                # Other files use ├── symbol
                                f.write(f"{subindent}├── 📄 {file} ({get_time_diff(last_mod)})\n")
                            file_count += 1
                        except Exception as e:
                            print(f"Error processing file {file}: {e}")
        
        print(f"\nScan complete!")
        print(f"Found {dir_count} directories and {file_count} files")
        print(f"Results saved to: {output_file}")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Starting folder tree generation...")
    create_folder_tree(use_gitignore=True)  # Set to False to ignore only .git folder
