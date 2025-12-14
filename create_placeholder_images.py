from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory if it doesn't exist
os.makedirs('public/images/securevault', exist_ok=True)

# Define the images to create
images = [
    {
        'filename': 'client-file-drop.png',
        'title': 'Client File Drop',
        'description': 'Secure file upload interface',
        'color': (34, 197, 94)  # emerald-500
    },
    {
        'filename': 'workflow-builder.png',
        'title': 'Workflow Builder',
        'description': 'Visual workflow designer',
        'color': (59, 130, 246)  # blue-500
    },
    {
        'filename': 'audit-log.png',
        'title': 'Audit Log',
        'description': 'Activity tracking dashboard',
        'color': (168, 85, 247)  # purple-500
    },
    {
        'filename': 'security-dashboard.png',
        'title': 'Security Dashboard',
        'description': 'Security monitoring interface',
        'color': (239, 68, 68)  # red-500
    },
    {
        'filename': 'automation.png',
        'title': 'Document Automation',
        'description': 'Automated workflow engine',
        'color': (245, 158, 11)  # amber-500
    },
    {
        'filename': 'client-portal.png',
        'title': 'Client Portal',
        'description': 'Secure client access',
        'color': (16, 185, 129)  # emerald-500
    }
]

# Create each placeholder image
for img_data in images:
    # Create a 400x300 image
    width, height = 400, 300
    image = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(image)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw a colored rectangle at the top
    draw.rectangle([0, 0, width, 80], fill=img_data['color'])
    
    # Draw title in white on colored background
    title_bbox = draw.textbbox((0, 0), img_data['title'], font=font_large)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 20), img_data['title'], fill='white', font=font_large)
    
    # Draw description below
    desc_bbox = draw.textbbox((0, 0), img_data['description'], font=font_small)
    desc_width = desc_bbox[2] - desc_bbox[0]
    desc_x = (width - desc_width) // 2
    draw.text((desc_x, 100), img_data['description'], fill='gray', font=font_small)
    
    # Draw a simple mock interface
    # Draw some rectangles to simulate UI elements
    draw.rectangle([50, 150, 350, 200], outline='lightgray', width=2)
    draw.rectangle([50, 220, 200, 250], outline='lightgray', width=2)
    draw.rectangle([220, 220, 350, 250], outline='lightgray', width=2)
    
    # Add some text to simulate interface
    draw.text((60, 160), "Upload Area", fill='gray', font=font_small)
    draw.text((60, 230), "Button 1", fill='gray', font=font_small)
    draw.text((230, 230), "Button 2", fill='gray', font=font_small)
    
    # Save the image
    filepath = f"public/images/securevault/{img_data['filename']}"
    image.save(filepath)
    print(f"Created {filepath}")

print("All placeholder images created successfully!")
