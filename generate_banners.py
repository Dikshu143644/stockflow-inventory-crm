#!/usr/bin/env python3
"""
Generate cinematic banner images for StockFlow Inventory CRM.
Uses PIL/Pillow with gradients, noise, bokeh circles, and color variation.
"""

import os
import random
import math
from PIL import Image, ImageDraw, ImageFilter

# Seed for reproducibility
random.seed(42)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(BASE_DIR, "public", "images", "pages")
AI_DIR = os.path.join(BASE_DIR, "public", "images", "ai")

os.makedirs(PAGES_DIR, exist_ok=True)
os.makedirs(AI_DIR, exist_ok=True)


def lerp_color(c1, c2, t):
    """Linear interpolation between two RGB colors."""
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def create_gradient_layer(width, height, colors, angle=0):
    """Create a multi-stop gradient at a given angle."""
    img = Image.new("RGB", (width, height))
    pixels = img.load()

    # Compute direction vector
    rad = math.radians(angle)
    dx = math.cos(rad)
    dy = math.sin(rad)

    # Project corners to find range
    corners = [(0, 0), (width, 0), (0, height), (width, height)]
    projections = [x * dx + y * dy for x, y in corners]
    min_proj = min(projections)
    max_proj = max(projections)
    proj_range = max_proj - min_proj if max_proj != min_proj else 1

    num_stops = len(colors)

    for y in range(height):
        for x in range(width):
            proj = (x * dx + y * dy - min_proj) / proj_range
            proj = max(0.0, min(1.0, proj))

            # Find which segment
            segment_size = 1.0 / (num_stops - 1)
            segment_idx = int(proj / segment_size)
            if segment_idx >= num_stops - 1:
                segment_idx = num_stops - 2
            local_t = (proj - segment_idx * segment_size) / segment_size
            color = lerp_color(colors[segment_idx], colors[segment_idx + 1], local_t)
            pixels[x, y] = color

    return img


def create_radial_gradient(width, height, center, radius, inner_color, outer_color):
    """Create a radial gradient overlay."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels = img.load()

    cx, cy = center

    for y in range(height):
        for x in range(width):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            t = min(1.0, dist / radius)
            r = int(inner_color[0] + (outer_color[0] - inner_color[0]) * t)
            g = int(inner_color[1] + (outer_color[1] - inner_color[1]) * t)
            b = int(inner_color[2] + (outer_color[2] - inner_color[2]) * t)
            a = int(inner_color[3] + (outer_color[3] - inner_color[3]) * t)
            pixels[x, y] = (r, g, b, a)

    return img


def add_noise(img, intensity=15):
    """Add film grain noise to an image."""
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            noise = random.randint(-intensity, intensity)
            r, g, b = pixels[x, y][:3]
            r = max(0, min(255, r + noise))
            g = max(0, min(255, g + noise))
            b = max(0, min(255, b + noise))
            pixels[x, y] = (r, g, b)

    return img


def add_bokeh(img, num_circles=20, min_radius=10, max_radius=60, colors=None, alpha_range=(20, 80)):
    """Add bokeh circles to an image."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    width, height = img.size

    if colors is None:
        colors = [(255, 255, 255)]

    for _ in range(num_circles):
        x = random.randint(-max_radius, width + max_radius)
        y = random.randint(-max_radius, height + max_radius)
        r = random.randint(min_radius, max_radius)
        color = random.choice(colors)
        alpha = random.randint(alpha_range[0], alpha_range[1])

        # Draw filled circle with transparency
        draw.ellipse(
            [x - r, y - r, x + r, y + r],
            fill=(*color, alpha)
        )

    # Blur the bokeh slightly for softness
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=3))

    # Composite
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    result = Image.alpha_composite(img, overlay)
    return result


def add_vignette(img, strength=0.6):
    """Add a vignette (dark corners) effect."""
    width, height = img.size
    vignette = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels = vignette.load()

    cx, cy = width / 2, height / 2
    max_dist = math.sqrt(cx ** 2 + cy ** 2)

    for y in range(height):
        for x in range(width):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            t = dist / max_dist
            # Apply power curve for smoother vignette
            alpha = int(255 * strength * (t ** 2))
            alpha = min(255, alpha)
            pixels[x, y] = (0, 0, 0, alpha)

    if img.mode != "RGBA":
        img = img.convert("RGBA")
    return Image.alpha_composite(img, vignette)


def generate_cinematic_banner(width, height, gradient_colors, gradient_angle,
                               radial_center=None, radial_colors=None,
                               bokeh_colors=None, bokeh_count=25,
                               noise_intensity=12, vignette_strength=0.5):
    """Generate a complete cinematic banner image."""
    # Base gradient
    img = create_gradient_layer(width, height, gradient_colors, gradient_angle)

    # Add radial gradient overlay
    if radial_center and radial_colors:
        cx = int(radial_center[0] * width)
        cy = int(radial_center[1] * height)
        radius = int(max(width, height) * 0.7)
        radial = create_radial_gradient(width, height, (cx, cy), radius,
                                         radial_colors[0], radial_colors[1])
        img = img.convert("RGBA")
        img = Image.alpha_composite(img, radial)

    # Add bokeh
    if bokeh_colors:
        img = add_bokeh(img, num_circles=bokeh_count,
                        min_radius=int(min(width, height) * 0.02),
                        max_radius=int(min(width, height) * 0.12),
                        colors=bokeh_colors,
                        alpha_range=(15, 60))

    # Add vignette
    img = add_vignette(img, strength=vignette_strength)

    # Convert to RGB for noise
    img = img.convert("RGB")

    # Add noise
    img = add_noise(img, intensity=noise_intensity)

    return img


def generate_tech_pattern(width, height, base_color, line_color, grid_spacing=40):
    """Generate a subtle tech grid pattern for AI backgrounds."""
    img = Image.new("RGB", (width, height), base_color)
    draw = ImageDraw.Draw(img)

    # Draw subtle grid lines
    for x in range(0, width, grid_spacing):
        alpha_variation = random.randint(20, 50)
        line_c = tuple(min(255, c + alpha_variation) for c in base_color)
        draw.line([(x, 0), (x, height)], fill=line_c, width=1)

    for y in range(0, height, grid_spacing):
        alpha_variation = random.randint(20, 50)
        line_c = tuple(min(255, c + alpha_variation) for c in base_color)
        draw.line([(0, y), (width, y)], fill=line_c, width=1)

    # Add some dots at intersections
    for x in range(0, width, grid_spacing):
        for y in range(0, height, grid_spacing):
            if random.random() < 0.3:
                r = random.randint(1, 3)
                dot_color = tuple(min(255, c + 60) for c in base_color)
                draw.ellipse([x - r, y - r, x + r, y + r], fill=dot_color)

    # Add subtle radial glow
    img = img.convert("RGBA")
    radial = create_radial_gradient(width, height, (width // 2, height // 2),
                                     int(max(width, height) * 0.6),
                                     (*line_color, 40), (0, 0, 0, 0))
    img = Image.alpha_composite(img, radial)
    img = img.convert("RGB")
    img = add_noise(img, intensity=8)

    return img


def generate_avatar(size, inner_color, outer_color, ring_colors):
    """Generate a bot avatar with concentric circles."""
    img = Image.new("RGB", (size, size), outer_color)
    draw = ImageDraw.Draw(img)

    cx, cy = size // 2, size // 2
    max_r = size // 2 - 10

    # Draw concentric rings
    num_rings = len(ring_colors)
    ring_width = max_r // (num_rings + 1)

    for i, color in enumerate(ring_colors):
        r = max_r - i * ring_width
        alpha = 180 - i * 20
        # Draw as ellipse
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=3)

    # Add some filled inner circles
    inner_r = ring_width * 2
    draw.ellipse([cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r],
                 fill=inner_color)

    # Add a glow effect
    img = img.convert("RGBA")
    glow = create_radial_gradient(size, size, (cx, cy), inner_r * 2,
                                   (*inner_color, 100), (0, 0, 0, 0))
    img = Image.alpha_composite(img, glow)

    # Add bokeh
    img = add_bokeh(img, num_circles=15,
                    min_radius=5, max_radius=30,
                    colors=[inner_color, outer_color, ring_colors[0]],
                    alpha_range=(20, 50))

    img = img.convert("RGB")
    img = add_noise(img, intensity=10)

    return img


# Banner configurations
BANNERS = [
    {
        "name": "banner-stock-movements.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(10, 30, 60), (20, 80, 120), (15, 50, 80), (40, 60, 90)],
        "gradient_angle": 30,
        "radial_center": (0.7, 0.4),
        "radial_colors": [(230, 120, 40, 80), (0, 0, 0, 0)],
        "bokeh_colors": [(60, 150, 220), (230, 130, 50), (100, 200, 230)],
        "bokeh_count": 30,
    },
    {
        "name": "banner-adjustments.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(30, 50, 20), (60, 80, 30), (100, 120, 40), (180, 150, 50)],
        "gradient_angle": 45,
        "radial_center": (0.3, 0.5),
        "radial_colors": [(200, 170, 60, 70), (0, 0, 0, 0)],
        "bokeh_colors": [(200, 180, 60), (80, 140, 50), (240, 200, 80)],
        "bokeh_count": 25,
    },
    {
        "name": "banner-low-stock.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(80, 30, 10), (160, 70, 20), (200, 100, 30), (180, 60, 20)],
        "gradient_angle": 15,
        "radial_center": (0.5, 0.3),
        "radial_colors": [(255, 180, 50, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(255, 150, 50), (200, 80, 30), (255, 200, 100)],
        "bokeh_count": 20,
    },
    {
        "name": "banner-follow-ups.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(60, 30, 20), (180, 90, 50), (220, 120, 70), (200, 100, 60)],
        "gradient_angle": 60,
        "radial_center": (0.6, 0.5),
        "radial_colors": [(255, 140, 80, 70), (0, 0, 0, 0)],
        "bokeh_colors": [(255, 160, 100), (220, 100, 60), (255, 200, 150)],
        "bokeh_count": 22,
    },
    {
        "name": "banner-funnel.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(15, 20, 60), (30, 50, 120), (50, 70, 160), (80, 50, 140)],
        "gradient_angle": -20,
        "radial_center": (0.4, 0.6),
        "radial_colors": [(120, 80, 200, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(80, 120, 220), (150, 100, 200), (60, 180, 220)],
        "bokeh_count": 28,
    },
    {
        "name": "banner-purchase-orders.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(10, 40, 50), (20, 80, 100), (30, 100, 120), (15, 60, 80)],
        "gradient_angle": 10,
        "radial_center": (0.8, 0.3),
        "radial_colors": [(50, 180, 160, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(50, 180, 180), (30, 120, 140), (80, 200, 200)],
        "bokeh_count": 24,
    },
    {
        "name": "banner-sales-orders.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(60, 30, 10), (180, 100, 30), (220, 140, 40), (200, 120, 30)],
        "gradient_angle": 35,
        "radial_center": (0.5, 0.4),
        "radial_colors": [(255, 180, 60, 70), (0, 0, 0, 0)],
        "bokeh_colors": [(255, 180, 60), (220, 140, 30), (255, 220, 100)],
        "bokeh_count": 26,
    },
    {
        "name": "banner-returns.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(40, 30, 50), (70, 50, 90), (90, 70, 110), (60, 50, 80)],
        "gradient_angle": -10,
        "radial_center": (0.6, 0.5),
        "radial_colors": [(120, 100, 150, 50), (0, 0, 0, 0)],
        "bokeh_colors": [(120, 100, 160), (80, 70, 120), (160, 140, 200)],
        "bokeh_count": 20,
    },
    {
        "name": "banner-ai-assistant.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(5, 15, 35), (10, 40, 80), (20, 80, 140), (10, 50, 100)],
        "gradient_angle": 25,
        "radial_center": (0.5, 0.5),
        "radial_colors": [(40, 200, 255, 80), (0, 0, 0, 0)],
        "bokeh_colors": [(40, 180, 255), (80, 220, 255), (20, 140, 200)],
        "bokeh_count": 35,
    },
    {
        "name": "banner-knowledge-base.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(50, 35, 15), (120, 90, 40), (180, 140, 60), (140, 100, 40)],
        "gradient_angle": 40,
        "radial_center": (0.4, 0.4),
        "radial_colors": [(220, 180, 80, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(220, 180, 80), (180, 140, 50), (255, 220, 120)],
        "bokeh_count": 22,
    },
    {
        "name": "banner-settings.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(30, 35, 45), (60, 70, 85), (80, 90, 110), (50, 60, 75)],
        "gradient_angle": 0,
        "radial_center": (0.5, 0.5),
        "radial_colors": [(100, 120, 160, 50), (0, 0, 0, 0)],
        "bokeh_colors": [(120, 140, 170), (80, 100, 130), (160, 180, 210)],
        "bokeh_count": 18,
    },
    {
        "name": "banner-users.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(60, 35, 20), (180, 110, 60), (220, 150, 90), (200, 130, 70)],
        "gradient_angle": 50,
        "radial_center": (0.3, 0.6),
        "radial_colors": [(255, 180, 120, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(255, 180, 120), (220, 140, 80), (255, 210, 160)],
        "bokeh_count": 24,
    },
    {
        "name": "banner-roles.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(15, 10, 50), (30, 20, 100), (50, 30, 140), (40, 20, 120)],
        "gradient_angle": -15,
        "radial_center": (0.7, 0.4),
        "radial_colors": [(100, 60, 200, 70), (0, 0, 0, 0)],
        "bokeh_colors": [(80, 50, 180), (120, 80, 220), (60, 40, 160)],
        "bokeh_count": 28,
    },
    {
        "name": "banner-audit-log.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(8, 15, 30), (15, 30, 55), (20, 40, 70), (12, 25, 45)],
        "gradient_angle": 5,
        "radial_center": (0.6, 0.5),
        "radial_colors": [(40, 180, 100, 50), (0, 0, 0, 0)],
        "bokeh_colors": [(40, 180, 120), (30, 140, 80), (60, 200, 140)],
        "bokeh_count": 22,
    },
    {
        "name": "banner-branches.jpg",
        "width": 1200, "height": 400,
        "gradient_colors": [(50, 30, 20), (120, 70, 40), (180, 120, 60), (140, 90, 50)],
        "gradient_angle": 55,
        "radial_center": (0.4, 0.5),
        "radial_colors": [(200, 150, 80, 60), (0, 0, 0, 0)],
        "bokeh_colors": [(200, 150, 80), (160, 100, 50), (240, 200, 120), (180, 130, 70)],
        "bokeh_count": 30,
    },
]


def main():
    print("Generating banner images...")

    for i, config in enumerate(BANNERS):
        print(f"  [{i+1}/{len(BANNERS)}] {config['name']}...")
        img = generate_cinematic_banner(
            width=config["width"],
            height=config["height"],
            gradient_colors=config["gradient_colors"],
            gradient_angle=config["gradient_angle"],
            radial_center=config.get("radial_center"),
            radial_colors=config.get("radial_colors"),
            bokeh_colors=config.get("bokeh_colors"),
            bokeh_count=config.get("bokeh_count", 25),
            noise_intensity=12,
            vignette_strength=0.5,
        )
        img.save(os.path.join(PAGES_DIR, config["name"]), "JPEG", quality=85)

    # Generate AI images
    print("  [AI 1/2] ai-chat-bg.jpg...")
    ai_chat_bg = generate_tech_pattern(
        1200, 800,
        base_color=(18, 22, 32),
        line_color=(40, 80, 120),
        grid_spacing=40
    )
    ai_chat_bg.save(os.path.join(AI_DIR, "ai-chat-bg.jpg"), "JPEG", quality=85)

    print("  [AI 2/2] ai-bot-avatar.jpg...")
    ai_avatar = generate_avatar(
        800,
        inner_color=(230, 120, 40),
        outer_color=(15, 25, 45),
        ring_colors=[
            (60, 160, 220),
            (230, 130, 50),
            (40, 200, 255),
            (180, 100, 40),
            (80, 180, 220),
            (200, 120, 50),
        ]
    )
    ai_avatar.save(os.path.join(AI_DIR, "ai-bot-avatar.jpg"), "JPEG", quality=85)

    print("Done! All images generated.")


if __name__ == "__main__":
    main()
