#!/usr/bin/env python3
"""
Simple HTTP Server for ClarityCare Healthcare Transparency Platform
Run this script to start the development server.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

def main():
    """Start the HTTP server and open the app in browser"""
    
    # Change to the public directory
    public_dir = Path(__file__).parent / 'public'
    
    if not public_dir.exists():
        print("❌ Error: 'public' directory not found!")
        print("Make sure you're running this script from the project root directory.")
        sys.exit(1)
    
    os.chdir(public_dir)
    
    # Create server
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            
            print("🏥 ClarityCare Healthcare Transparency Platform")
            print("=" * 50)
            print(f"🚀 Server starting at: {server_url}")
            print(f"📁 Serving files from: {public_dir}")
            print("=" * 50)
            print("✅ Server is running! Press Ctrl+C to stop.")
            print()
            
            # Try to open browser automatically
            try:
                webbrowser.open(server_url)
                print("🌐 Opening browser automatically...")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"Please manually open: {server_url}")
            
            print()
            print("📋 Features Available:")
            print("  • Medical Protection - Treatment pricing analysis")
            print("  • Financial Protection - Insurance policy decoder")
            print("  • Market Protection - Regional price comparison")
            print()
            
            # Start server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use!")
            print("Try running with a different port or stop other servers.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()