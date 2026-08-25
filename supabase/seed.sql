-- =============================================================================
-- StockFlow Inventory CRM - Seed Data
-- =============================================================================
-- Comprehensive seed data for development and demo purposes.
-- All INSERT statements use ON CONFLICT DO NOTHING for idempotency.
-- Can be safely re-run without duplicating data.
-- =============================================================================

-- =====================
-- ROLES
-- =====================
INSERT INTO roles (id, name, description, is_system, permissions) VALUES
('11111111-1111-1111-1111-111111111111', 'admin', 'Administrator with full system access', true, '{"all": true}'),
('22222222-2222-2222-2222-222222222222', 'manager', 'Operations and CRM manager', true, '{"inventory": true, "crm": true, "sales": true, "procurement": true, "reports": true}'),
('33333333-3333-3333-3333-333333333333', 'staff', 'Inventory and warehouse staff', true, '{"inventory": true, "sales_read": true}'),
('44444444-4444-4444-4444-444444444444', 'client', 'Client / Viewer access', true, '{"dashboard": true, "sales_orders": true, "invoices": true}'),
('55555555-5555-5555-5555-555555555555', 'viewer', 'Basic viewer access', true, '{"dashboard": true}')
ON CONFLICT (name) DO NOTHING;

-- =====================
-- BRANCHES
-- =====================
INSERT INTO branches (id, name, code, city, state, country, is_active) VALUES
('b1111111-1111-1111-1111-111111111111', 'Mumbai Central Hub', 'BR-MUM', 'Mumbai', 'Maharashtra', 'India', true),
('b2222222-2222-2222-2222-222222222222', 'Delhi Logistics Center', 'BR-DEL', 'New Delhi', 'Delhi', 'India', true),
('b3333333-3333-3333-3333-333333333333', 'Bengaluru Tech Warehouse', 'BR-BLR', 'Bengaluru', 'Karnataka', 'India', true),
('b4444444-4444-4444-4444-444444444444', 'Kolkata East Wing', 'BR-KOL', 'Kolkata', 'West Bengal', 'India', true),
('b5555555-5555-5555-5555-555555555555', 'Ahmedabad West Port', 'BR-AHM', 'Ahmedabad', 'Gujarat', 'India', true)
ON CONFLICT (code) DO NOTHING;

-- =====================
-- WAREHOUSES
-- =====================
INSERT INTO warehouses (id, name, code, address, city, state, is_active, capacity) VALUES
('10000000-0000-0000-0000-000000000001', 'Main Warehouse', 'WH-MUM', 'Andheri East Industrial Zone', 'Mumbai', 'Maharashtra', true, 10000),
('10000000-0000-0000-0000-000000000002', 'North Distribution Hub', 'WH-DEL', 'Okhla Phase III', 'New Delhi', 'Delhi', true, 8000),
('10000000-0000-0000-0000-000000000003', 'South Tech Center', 'WH-BLR', 'Electronic City Phase 1', 'Bengaluru', 'Karnataka', true, 6000),
('10000000-0000-0000-0000-000000000004', 'East Wing Storage', 'WH-KOL', 'Salt Lake Sector V', 'Kolkata', 'West Bengal', true, 5000),
('10000000-0000-0000-0000-000000000005', 'West Port Facility', 'WH-AHM', 'Sanand Industrial Estate', 'Ahmedabad', 'Gujarat', true, 7000),
('10000000-0000-0000-0000-000000000006', 'Overflow Storage B2', 'WH-PUN', 'Hinjawadi IT Park', 'Pune', 'Maharashtra', false, 3000)
ON CONFLICT (code) DO NOTHING;

-- =====================
-- CATEGORIES
-- =====================
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
('20000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Circuit boards, microcontrollers, power supplies, and electronic modules', 1),
('20000000-0000-0000-0000-000000000002', 'Industrial Parts', 'industrial-parts', 'Servo motors, precision bearings, hydraulic systems, and actuators', 2),
('20000000-0000-0000-0000-000000000003', 'Wiring', 'wiring', 'Copper cables, PCB connectors, terminal blocks, and harnesses', 3),
('20000000-0000-0000-0000-000000000004', 'Raw Materials', 'raw-materials', 'Aluminum sheets, structural alloys, thermal compounds, and base metals', 4),
('20000000-0000-0000-0000-000000000005', 'Office Supplies', 'office-supplies', 'Ergonomic furniture, peripherals, and office equipment', 5),
('20000000-0000-0000-0000-000000000006', 'Packaging', 'packaging', 'Industrial tape, cartons, shrink wrap, and shipping materials', 6),
('20000000-0000-0000-0000-000000000007', 'Safety Equipment', 'safety-equipment', 'Helmets, goggles, gloves, and protective gear', 7)
ON CONFLICT (slug) DO NOTHING;

-- =====================
-- PRODUCTS (66+ products)
-- =====================
-- Electronics (16 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000001', 'Circuit Board Pro X1', 'PCB-PRO-001', '20000000-0000-0000-0000-000000000001', 'Multi-layer high frequency printed circuit board for edge computing and IoT gateway controllers', 125.00, 78.50, 25, '/images/products/circuit-board-pro.jpg', true),
('30000000-0000-0000-0000-000000000004', 'Ultra-Bright LED Panel 60W', 'LED-PAN-60W', '20000000-0000-0000-0000-000000000001', 'Energy-efficient high CRI industrial cleanroom and factory LED lighting panel with PWM dimming', 65.00, 38.00, 15, '/images/products/led-panel.jpg', true),
('30000000-0000-0000-0000-000000000006', 'Thermal Paste TG-7 Extreme', 'THM-PST-007', '20000000-0000-0000-0000-000000000001', 'High thermal conductivity 14.5 W/mK non-conductive thermal interface compound (50g)', 22.50, 11.00, 50, '/images/products/thermal-paste.jpg', true),
('30000000-0000-0000-0000-000000000009', 'Precision Resistor Pack 10K Ohm', 'RES-PCK-10K', '20000000-0000-0000-0000-000000000001', '0.1% tolerance thin-film surface mount resistors reel of 1000 pieces', 32.00, 14.00, 25, '/images/products/resistor-pack.jpg', true),
('30000000-0000-0000-0000-000000000012', 'Wireless Ergonomic Mouse BT500', 'WM-BT500-RGB', '20000000-0000-0000-0000-000000000001', 'Multi-device Bluetooth and 2.4GHz wireless mouse with stealth black ergonomic grip and 4000 DPI sensor', 48.00, 28.00, 25, '/images/products/wireless-mouse.jpg', true),
('30000000-0000-0000-0000-000000000016', 'DIN-Rail 24V 120W Power Supply', 'PWR-DIN-24V', '20000000-0000-0000-0000-000000000001', 'High-efficiency industrial switching power supply with overload protection and LED status', 92.00, 55.00, 15, '/images/products/power-supply.jpg', true),
('30000000-0000-0000-0000-000000000017', 'Arduino Mega 2560 R3', 'ARD-MGA-2560', '20000000-0000-0000-0000-000000000001', 'ATmega2560 microcontroller board with 54 digital I/O pins and 16 analog inputs', 42.00, 24.00, 20, '/images/products/arduino-mega.jpg', true),
('30000000-0000-0000-0000-000000000018', 'Raspberry Pi 5 8GB', 'RPI-5-8GB', '20000000-0000-0000-0000-000000000001', 'Quad-core Arm Cortex-A76 single-board computer with 8GB LPDDR4X RAM', 85.00, 62.00, 15, '/images/products/raspberry-pi-5.jpg', true),
('30000000-0000-0000-0000-000000000019', 'OLED Display Module 1.3"', 'OLED-13-I2C', '20000000-0000-0000-0000-000000000001', '128x64 pixel I2C OLED display module with SH1106 driver for IoT dashboards', 12.50, 6.00, 50, '/images/products/oled-display.jpg', true),
('30000000-0000-0000-0000-000000000020', 'ESP32 DevKit V4', 'ESP32-DK-V4', '20000000-0000-0000-0000-000000000001', 'Dual-core WiFi and Bluetooth SoC development board with 38 GPIO pins', 18.00, 9.50, 40, '/images/products/esp32-devkit.jpg', true),
('30000000-0000-0000-0000-000000000021', 'Capacitor Pack 100uF/25V', 'CAP-100UF-25', '20000000-0000-0000-0000-000000000001', 'Electrolytic aluminum capacitors 100uF 25V low ESR pack of 50', 8.50, 3.80, 60, '/images/products/capacitor-pack.jpg', true),
('30000000-0000-0000-0000-000000000022', 'Soldering Station 60W Digital', 'SOL-60W-DIG', '20000000-0000-0000-0000-000000000001', 'Temperature-controlled soldering station with LED display and ESD-safe handle', 75.00, 42.00, 10, '/images/products/soldering-station.jpg', true),
('30000000-0000-0000-0000-000000000023', 'Logic Analyzer 24MHz 8-Ch', 'LA-24MHZ-8CH', '20000000-0000-0000-0000-000000000001', 'USB logic analyzer with 24MHz sampling rate and 8 channels for protocol debugging', 28.00, 14.50, 15, '/images/products/logic-analyzer.jpg', true),
('30000000-0000-0000-0000-000000000024', 'Voltage Regulator LM7805', 'VR-LM7805-PK', '20000000-0000-0000-0000-000000000001', '5V 1.5A linear voltage regulator TO-220 package - bulk pack of 100', 15.00, 6.00, 80, '/images/products/voltage-regulator.jpg', true),
('30000000-0000-0000-0000-000000000025', 'MOSFET IRF540N', 'MOS-IRF540N', '20000000-0000-0000-0000-000000000001', 'N-Channel 100V 33A power MOSFET TO-220 package for motor drivers', 4.50, 1.80, 100, '/images/products/mosfet-irf540n.jpg', true),
('30000000-0000-0000-0000-000000000026', 'PCB Prototype Board 10x15cm', 'PCB-PROTO-1015', '20000000-0000-0000-0000-000000000001', 'Double-sided FR-4 prototype PCB with plated through-holes 2.54mm pitch', 5.00, 2.20, 50, '/images/products/pcb-proto.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Industrial Parts (12 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000002', 'Industrial Servo Motor 750W', 'SRV-750W-002', '20000000-0000-0000-0000-000000000002', 'High-torque AC brushless servo motor with integrated 24-bit magnetic absolute encoder', 340.00, 210.00, 10, '/images/products/servo-motor.jpg', true),
('30000000-0000-0000-0000-000000000005', 'Precision Steel Bearings Set', 'BRG-STL-800', '20000000-0000-0000-0000-000000000002', 'ABEC-9 graded stainless steel deep groove ball bearings for high-RPM rotary machinery', 45.00, 24.00, 40, '/images/products/steel-bearings.jpg', true),
('30000000-0000-0000-0000-000000000010', 'Hydraulic Pump HP-200', 'HP-200-IND', '20000000-0000-0000-0000-000000000002', 'High-pressure cast iron hydraulic power unit for heavy manufacturing and pneumatic automation', 850.00, 520.00, 5, '/images/products/hydraulic-pump.jpg', true),
('30000000-0000-0000-0000-000000000015', 'Pneumatic Solenoid Valve Block', 'VLV-PNM-24V', '20000000-0000-0000-0000-000000000002', '5-way 2-position 24V DC solenoid directional control manifold with brass push-in fittings', 210.00, 125.00, 12, '/images/products/pneumatic-valves.jpg', true),
('30000000-0000-0000-0000-000000000027', 'Linear Actuator 300mm Stroke', 'LA-300-24V', '20000000-0000-0000-0000-000000000002', '24V DC linear actuator with 300mm stroke and 1500N force rating', 180.00, 105.00, 8, '/images/products/linear-actuator.jpg', true),
('30000000-0000-0000-0000-000000000028', 'Stepper Motor NEMA 23', 'STP-NEMA23-3A', '20000000-0000-0000-0000-000000000002', 'Bipolar stepper motor 2.8A 1.26Nm with 1.8 degree step angle for CNC machines', 55.00, 32.00, 15, '/images/products/stepper-nema23.jpg', true),
('30000000-0000-0000-0000-000000000029', 'Timing Belt GT2 6mm (5m)', 'TB-GT2-6MM-5M', '20000000-0000-0000-0000-000000000002', 'GT2 profile rubber timing belt 6mm width 5-meter roll for 3D printers and CNC', 14.00, 6.50, 30, '/images/products/timing-belt.jpg', true),
('30000000-0000-0000-0000-000000000030', 'Ball Screw SFU1605 (500mm)', 'BS-SFU1605-500', '20000000-0000-0000-0000-000000000002', 'C7 grade rolled ball screw 16mm diameter 5mm lead with nut assembly', 95.00, 55.00, 8, '/images/products/ball-screw.jpg', true),
('30000000-0000-0000-0000-000000000031', 'Pneumatic Cylinder 50mm Bore', 'PC-50-200-DBL', '20000000-0000-0000-0000-000000000002', 'Double-acting pneumatic cylinder 50mm bore 200mm stroke with magnetic sensor', 68.00, 38.00, 12, '/images/products/pneumatic-cylinder.jpg', true),
('30000000-0000-0000-0000-000000000032', 'Gear Motor 12V 100RPM', 'GM-12V-100RPM', '20000000-0000-0000-0000-000000000002', 'DC gear motor 12V with 100RPM output speed and 10kg.cm torque', 25.00, 13.00, 20, '/images/products/gear-motor.jpg', true),
('30000000-0000-0000-0000-000000000033', 'Coupling Jaw Spider 8x10mm', 'CJ-8X10-AL', '20000000-0000-0000-0000-000000000002', 'Aluminum alloy jaw coupling 8mm to 10mm bore with polyurethane spider', 12.00, 5.50, 25, '/images/products/jaw-coupling.jpg', true),
('30000000-0000-0000-0000-000000000034', 'Linear Rail Guide MGN12H (400mm)', 'LR-MGN12H-400', '20000000-0000-0000-0000-000000000002', 'Miniature linear guide rail MGN12 with H-type carriage block 400mm length', 35.00, 18.00, 15, '/images/products/linear-rail.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Wiring (8 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000003', 'Copper Wire 2.5mm Reel (100m)', 'WIR-COP-250', '20000000-0000-0000-0000-000000000003', 'Pure oxygen-free electrolytic copper wire with double insulation for industrial automation', 88.00, 52.00, 30, '/images/products/copper-wire.jpg', true),
('30000000-0000-0000-0000-000000000007', 'PCB Terminal Connector 12-Pin', 'CON-PCB-12P', '20000000-0000-0000-0000-000000000003', 'Screwless push-in DIN-rail mountable terminal connector blocks with gold-plated pins', 15.00, 6.50, 100, '/images/products/pcb-connector.jpg', true),
('30000000-0000-0000-0000-000000000035', 'Shielded Cable 4-Core 1.5mm (50m)', 'SC-4C-15-50M', '20000000-0000-0000-0000-000000000003', 'PVC shielded multi-core cable for industrial sensor wiring and data lines', 65.00, 38.00, 20, '/images/products/shielded-cable.jpg', true),
('30000000-0000-0000-0000-000000000036', 'Crimp Terminal Kit 1200pcs', 'CT-KIT-1200', '20000000-0000-0000-0000-000000000003', 'Insulated crimp wire terminal assortment with ratchet crimping tool', 28.00, 14.00, 15, '/images/products/crimp-kit.jpg', true),
('30000000-0000-0000-0000-000000000037', 'Cable Gland PG11 (10-pack)', 'CG-PG11-10PK', '20000000-0000-0000-0000-000000000003', 'IP68 waterproof nylon cable gland for 5-10mm cable diameter panel mounting', 9.50, 4.00, 40, '/images/products/cable-gland.jpg', true),
('30000000-0000-0000-0000-000000000038', 'Flexible Conduit 20mm (25m)', 'FC-20MM-25M', '20000000-0000-0000-0000-000000000003', 'PVC coated galvanized steel flexible conduit for cable protection in factories', 42.00, 24.00, 10, '/images/products/flex-conduit.jpg', true),
('30000000-0000-0000-0000-000000000039', 'DIN Rail Terminal Block 10A', 'DR-TB-10A-20', '20000000-0000-0000-0000-000000000003', 'Spring-loaded DIN rail terminal blocks 10A rated - pack of 20', 18.00, 8.50, 30, '/images/products/din-terminal.jpg', true),
('30000000-0000-0000-0000-000000000040', 'Heat Shrink Tubing Kit', 'HST-KIT-580PC', '20000000-0000-0000-0000-000000000003', 'Polyolefin heat shrink tubing assortment 580 pieces in 6 sizes with storage case', 16.00, 7.50, 20, '/images/products/heat-shrink.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Raw Materials (10 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000008', 'Anodized Aluminum Sheet 3mm', 'ALU-SHT-3MM', '20000000-0000-0000-0000-000000000004', '6061-T6 aerospace-grade brushed aluminum enclosure panel sheets (1000mm x 500mm)', 110.00, 68.00, 20, '/images/products/aluminum-sheet.jpg', true),
('30000000-0000-0000-0000-000000000041', 'Stainless Steel Rod 10mm (1m)', 'SS-ROD-10-1M', '20000000-0000-0000-0000-000000000004', '304 grade stainless steel round bar 10mm diameter precision ground 1 meter length', 22.00, 12.00, 30, '/images/products/ss-rod.jpg', true),
('30000000-0000-0000-0000-000000000042', 'Acrylic Sheet Clear 5mm', 'ACR-CLR-5MM', '20000000-0000-0000-0000-000000000004', 'Optically clear cast acrylic sheet 5mm thick (600mm x 400mm) for enclosures', 35.00, 18.00, 15, '/images/products/acrylic-sheet.jpg', true),
('30000000-0000-0000-0000-000000000043', 'Brass Hex Bar 12mm (500mm)', 'BRS-HEX-12-500', '20000000-0000-0000-0000-000000000004', 'Free-cutting brass hexagonal bar CZ121 12mm AF 500mm length for CNC machining', 28.00, 15.00, 20, '/images/products/brass-hex.jpg', true),
('30000000-0000-0000-0000-000000000044', 'Carbon Fiber Sheet 2mm', 'CF-SHT-2MM', '20000000-0000-0000-0000-000000000004', '3K twill weave carbon fiber composite sheet 2mm thick (400mm x 500mm)', 85.00, 52.00, 8, '/images/products/carbon-fiber.jpg', true),
('30000000-0000-0000-0000-000000000045', 'Nylon Block 50x50x100mm', 'NYL-BLK-50100', '20000000-0000-0000-0000-000000000004', 'Engineering grade nylon 6 block natural color for CNC milling and turning', 18.00, 8.50, 25, '/images/products/nylon-block.jpg', true),
('30000000-0000-0000-0000-000000000046', 'Copper Sheet 1mm (300x300mm)', 'CU-SHT-1MM', '20000000-0000-0000-0000-000000000004', 'C110 pure copper sheet 1mm thick 300x300mm for heatsinks and bus bars', 45.00, 28.00, 12, '/images/products/copper-sheet.jpg', true),
('30000000-0000-0000-0000-000000000047', 'PTFE Rod 20mm (500mm)', 'PTFE-ROD-20', '20000000-0000-0000-0000-000000000004', 'Virgin PTFE (Teflon) rod 20mm diameter 500mm length for seals and bushings', 24.00, 12.00, 15, '/images/products/ptfe-rod.jpg', true),
('30000000-0000-0000-0000-000000000048', 'Mild Steel Plate 6mm', 'MS-PLT-6MM', '20000000-0000-0000-0000-000000000004', 'Hot rolled mild steel plate 6mm thick (500mm x 300mm) for structural fabrication', 38.00, 20.00, 10, '/images/products/ms-plate.jpg', true),
('30000000-0000-0000-0000-000000000049', 'Silicone Rubber Sheet 3mm', 'SIL-RUB-3MM', '20000000-0000-0000-0000-000000000004', 'High-temperature silicone rubber sheet 3mm 60 Shore A (300x300mm) for gaskets', 15.00, 7.00, 20, '/images/products/silicone-sheet.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Office Supplies (8 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000011', 'Executive Ergonomic Chair OCE-100', 'OCE-100-PRO', '20000000-0000-0000-0000-000000000005', 'Commercial ergonomic chair with 4D adjustable armrests, breathable lumbar mesh, and aluminum base', 320.00, 185.00, 10, '/images/products/office-chair.jpg', true),
('30000000-0000-0000-0000-000000000050', 'Standing Desk Electric 160cm', 'DESK-ELC-160', '20000000-0000-0000-0000-000000000005', 'Dual-motor electric height adjustable desk 160x80cm with memory presets', 450.00, 280.00, 5, '/images/products/standing-desk.jpg', true),
('30000000-0000-0000-0000-000000000051', 'Monitor Arm Dual VESA', 'MA-DUAL-VESA', '20000000-0000-0000-0000-000000000005', 'Heavy-duty dual monitor arm clamp mount supports 17-32 inch monitors up to 9kg each', 65.00, 35.00, 12, '/images/products/monitor-arm.jpg', true),
('30000000-0000-0000-0000-000000000052', 'Mechanical Keyboard TKL', 'KB-TKL-BRN', '20000000-0000-0000-0000-000000000005', 'Tenkeyless mechanical keyboard with brown switches, PBT keycaps, and USB-C', 78.00, 42.00, 15, '/images/products/mech-keyboard.jpg', true),
('30000000-0000-0000-0000-000000000053', 'Desk Organizer Bamboo', 'DO-BAMBOO-XL', '20000000-0000-0000-0000-000000000005', 'Multi-compartment bamboo desk organizer with phone stand and pen holder', 32.00, 16.00, 20, '/images/products/desk-organizer.jpg', true),
('30000000-0000-0000-0000-000000000054', 'Webcam 4K AutoFocus', 'WC-4K-AF', '20000000-0000-0000-0000-000000000005', 'Ultra HD 4K webcam with autofocus, dual noise-cancelling mics, and privacy shutter', 95.00, 55.00, 10, '/images/products/webcam-4k.jpg', true),
('30000000-0000-0000-0000-000000000055', 'USB-C Docking Station 12-in-1', 'DOCK-USB-12', '20000000-0000-0000-0000-000000000005', '12-port USB-C hub with dual HDMI, Ethernet, SD card, and 100W PD charging', 85.00, 48.00, 12, '/images/products/usb-dock.jpg', true),
('30000000-0000-0000-0000-000000000056', 'Noise Cancelling Headset', 'HS-ANC-PRO', '20000000-0000-0000-0000-000000000005', 'Over-ear ANC headset with Bluetooth 5.3, 40hr battery, and retractable boom mic', 120.00, 68.00, 8, '/images/products/anc-headset.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Packaging (7 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000013', 'Industrial Packaging Tape 48mm', 'PKG-TPE-48M', '20000000-0000-0000-0000-000000000006', 'Heavy duty high-adhesion carton sealing tape rolls with handheld dispenser', 8.50, 4.00, 60, '/images/products/packaging-tape.jpg', true),
('30000000-0000-0000-0000-000000000057', 'Bubble Wrap Roll 500mm (50m)', 'BW-500-50M', '20000000-0000-0000-0000-000000000006', 'Large bubble cushioning wrap roll 500mm wide 50 meters for fragile item protection', 22.00, 11.00, 20, '/images/products/bubble-wrap.jpg', true),
('30000000-0000-0000-0000-000000000058', 'Corrugated Box 400x300x200mm', 'CB-400-300-200', '20000000-0000-0000-0000-000000000006', 'Double-wall corrugated shipping carton 400x300x200mm - bundle of 25', 35.00, 18.00, 15, '/images/products/corrugated-box.jpg', true),
('30000000-0000-0000-0000-000000000059', 'Stretch Film 500mm (300m)', 'SF-500-300M', '20000000-0000-0000-0000-000000000006', 'Clear pallet stretch wrap film 500mm wide 300m roll 23 micron', 18.00, 9.00, 25, '/images/products/stretch-film.jpg', true),
('30000000-0000-0000-0000-000000000060', 'Foam Packing Peanuts (0.5m3)', 'FP-05M3-BIO', '20000000-0000-0000-0000-000000000006', 'Biodegradable starch-based packing peanuts 0.5 cubic meter bag', 14.00, 6.50, 15, '/images/products/packing-peanuts.jpg', true),
('30000000-0000-0000-0000-000000000061', 'Poly Mailer Bags 300x400mm (100)', 'PM-300-400-100', '20000000-0000-0000-0000-000000000006', 'Self-seal polyethylene mailing bags 300x400mm white - pack of 100', 12.00, 5.50, 30, '/images/products/poly-mailer.jpg', true),
('30000000-0000-0000-0000-000000000062', 'Kraft Paper Roll 600mm (50m)', 'KP-600-50M', '20000000-0000-0000-0000-000000000006', 'Recycled kraft paper roll 600mm wide 50 meters for void fill and wrapping', 16.00, 8.00, 10, '/images/products/kraft-paper.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- Safety Equipment (5 products)
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, image_url, is_active) VALUES
('30000000-0000-0000-0000-000000000014', 'Industrial Safety Helmet & Visor', 'SAF-HLM-PRO', '20000000-0000-0000-0000-000000000007', 'Impact-resistant polycarbonate industrial hard hat with integrated eye shield and reflective decals', 55.00, 30.00, 20, '/images/products/safety-helmet.jpg', true),
('30000000-0000-0000-0000-000000000063', 'Safety Goggles Anti-Fog', 'SAF-GOG-AF', '20000000-0000-0000-0000-000000000007', 'Sealed safety goggles with anti-fog coating and indirect ventilation for chemical environments', 18.00, 8.50, 30, '/images/products/safety-goggles.jpg', true),
('30000000-0000-0000-0000-000000000064', 'Cut-Resistant Gloves Level 5', 'SAF-GLV-CR5', '20000000-0000-0000-0000-000000000007', 'HPPE fiber cut-resistant gloves EN388 Level 5 with polyurethane palm coating - pair', 12.00, 5.50, 40, '/images/products/cut-gloves.jpg', true),
('30000000-0000-0000-0000-000000000065', 'Ear Muffs NRR 30dB', 'SAF-EAR-30DB', '20000000-0000-0000-0000-000000000007', 'Over-head ear muffs with NRR 30dB noise reduction for loud factory environments', 28.00, 14.00, 20, '/images/products/ear-muffs.jpg', true),
('30000000-0000-0000-0000-000000000066', 'High-Vis Safety Vest Class 2', 'SAF-VEST-HV2', '20000000-0000-0000-0000-000000000007', 'ANSI/ISEA Class 2 high-visibility reflective safety vest with zipper closure', 15.00, 7.00, 25, '/images/products/safety-vest.jpg', true)
ON CONFLICT (sku) DO NOTHING;

-- =====================
-- INVENTORY LEVELS
-- =====================
INSERT INTO inventory (product_id, warehouse_id, quantity, reserved_quantity) VALUES
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 142, 12),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 38, 4),
('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 280, 20),
('30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000003', 95, 10),
('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 18, 5),
('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 115, 0),
('30000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 450, 30),
('30000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000003', 64, 8),
('30000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000001', 82, 0),
('30000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000002', 24, 2),
('30000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000003', 45, 3),
('30000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000001', 120, 8),
('30000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000002', 350, 0),
('30000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000003', 85, 5),
('30000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000001', 42, 6),
('30000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000002', 95, 10),
('30000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000001', 65, 5),
('30000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000003', 30, 4),
('30000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000002', 200, 15),
('30000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000001', 180, 20),
('30000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000001', 500, 0),
('30000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000003', 28, 2),
('30000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000002', 45, 0),
('30000000-0000-0000-0000-000000000024', '10000000-0000-0000-0000-000000000001', 800, 50),
('30000000-0000-0000-0000-000000000025', '10000000-0000-0000-0000-000000000001', 1200, 100),
('30000000-0000-0000-0000-000000000026', '10000000-0000-0000-0000-000000000002', 150, 0),
('30000000-0000-0000-0000-000000000027', '10000000-0000-0000-0000-000000000003', 22, 3),
('30000000-0000-0000-0000-000000000028', '10000000-0000-0000-0000-000000000002', 55, 5),
('30000000-0000-0000-0000-000000000029', '10000000-0000-0000-0000-000000000001', 120, 10),
('30000000-0000-0000-0000-000000000030', '10000000-0000-0000-0000-000000000003', 18, 2),
('30000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000002', 35, 4),
('30000000-0000-0000-0000-000000000032', '10000000-0000-0000-0000-000000000001', 80, 8),
('30000000-0000-0000-0000-000000000033', '10000000-0000-0000-0000-000000000001', 150, 0),
('30000000-0000-0000-0000-000000000034', '10000000-0000-0000-0000-000000000003', 40, 5)
ON CONFLICT (product_id, warehouse_id) DO NOTHING;

-- =====================
-- CUSTOMERS
-- =====================
INSERT INTO customers (id, company_name, contact_person, email, phone, customer_type, credit_limit, is_active) VALUES
('40000000-0000-0000-0000-000000000001', 'Apex Robotics Ltd', 'Rajiv Nair', 'procurement@apexrobotics.io', '+91 98201 12345', 'wholesale', 250000.00, true),
('40000000-0000-0000-0000-000000000002', 'TechVentures Enterprise', 'Sarah Johnson', 'orders@techventures.com', '+91 98111 23456', 'distributor', 500000.00, true),
('40000000-0000-0000-0000-000000000003', 'Quantum Dynamics Labs', 'Dr. Alok Verma', 'contact@quantumdynamics.org', '+91 98450 34567', 'regular', 100000.00, true),
('40000000-0000-0000-0000-000000000004', 'GreenTech Manufacturing', 'Priya Menon', 'purchasing@greentech.in', '+91 98765 11111', 'wholesale', 350000.00, true),
('40000000-0000-0000-0000-000000000005', 'AutoBots Solutions Pvt Ltd', 'Karthik Reddy', 'orders@autobotsolutions.com', '+91 98765 22222', 'distributor', 200000.00, true),
('40000000-0000-0000-0000-000000000006', 'SmartHome Innovations', 'Neha Kapoor', 'supply@smarthomeinno.co', '+91 98765 33333', 'regular', 75000.00, true),
('40000000-0000-0000-0000-000000000007', 'Titan Industrial Corp', 'Vikram Malhotra', 'procurement@titanindustrial.com', '+91 98765 44444', 'wholesale', 500000.00, true),
('40000000-0000-0000-0000-000000000008', 'ElectroParts Direct', 'Ravi Shankar', 'bulk@electropartsdirect.in', '+91 98765 55555', 'distributor', 180000.00, true)
ON CONFLICT (id) DO NOTHING;

-- =====================
-- SUPPLIERS
-- =====================
INSERT INTO suppliers (id, company_name, contact_person, email, phone, is_active, rating, payment_terms, city, state) VALUES
('70000000-0000-0000-0000-000000000001', 'MicroChip Supplies Ltd', 'Raman Iyer', 'orders@microchipsupplies.com', '+91 80 4567 8901', true, 5, 'Net 30', 'Bangalore', 'Karnataka'),
('70000000-0000-0000-0000-000000000002', 'TechComponents Global', 'David Ng', 'sales@techcomponents.hk', '+91 22 3456 7890', true, 4, 'Net 45', 'Mumbai', 'Maharashtra'),
('70000000-0000-0000-0000-000000000003', 'Steel Masters India', 'Suresh Agarwal', 'commercial@steelmasters.in', '+91 657 234 5678', true, 4, 'Net 30', 'Jamshedpur', 'Jharkhand'),
('70000000-0000-0000-0000-000000000004', 'Global Electronics Corp', 'Chen Wei', 'sourcing@globalelec.cn', '+91 11 2345 6789', true, 5, 'Net 60', 'Delhi', 'Delhi NCR'),
('70000000-0000-0000-0000-000000000005', 'PackRight Solutions', 'Anand Verma', 'orders@packright.co.in', '+91 20 6789 0123', true, 3, 'Net 15', 'Pune', 'Maharashtra'),
('70000000-0000-0000-0000-000000000006', 'HydroTech Systems', 'Kiran Bhatt', 'sales@hydrotechsys.com', '+91 79 8901 2345', true, 4, 'Net 30', 'Ahmedabad', 'Gujarat'),
('70000000-0000-0000-0000-000000000007', 'LED World Distributors', 'Prashant Kumar', 'wholesale@ledworld.in', '+91 44 5678 9012', false, 3, 'Net 30', 'Chennai', 'Tamil Nadu'),
('70000000-0000-0000-0000-000000000008', 'CopperLine Industries', 'Ramesh Gupta', 'trade@copperline.co.in', '+91 33 4567 8901', true, 4, 'Net 45', 'Kolkata', 'West Bengal'),
('70000000-0000-0000-0000-000000000009', 'SafetyFirst Equipment Co', 'Meena Sharma', 'sales@safetyfirst.in', '+91 141 555 6789', true, 5, 'Net 30', 'Jaipur', 'Rajasthan'),
('70000000-0000-0000-0000-000000000010', 'Pacific Bearings Ltd', 'Takeshi Mori', 'export@pacificbearings.jp', '+81 3 5555 1234', true, 5, 'Net 60', 'Osaka', 'Kansai')
ON CONFLICT (id) DO NOTHING;

-- =====================
-- CRM LEADS
-- =====================
INSERT INTO leads (id, company_name, contact_person, email, phone, status, source) VALUES
('50000000-0000-0000-0000-000000000001', 'Mehta Industries', 'Vikram Mehta', 'vikram@mehtaindustries.in', '+91 98765 43210', 'qualified', 'website'),
('50000000-0000-0000-0000-000000000002', 'GlobalTech Systems', 'Sarah Jenkins', 'sjenkins@globaltech.com', '+1 415 555 0199', 'proposal', 'referral'),
('50000000-0000-0000-0000-000000000003', 'SolarDrive Energy', 'Ananya Deshmukh', 'ananya@solardrive.co', '+91 98222 33445', 'negotiation', 'trade_show'),
('50000000-0000-0000-0000-000000000004', 'NovaTech Solutions', 'Arjun Patel', 'arjun@novatech.io', '+91 98333 44556', 'new', 'cold_call'),
('50000000-0000-0000-0000-000000000005', 'Precision Mfg Co', 'Linda Chen', 'lchen@precisionmfg.com', '+1 650 555 0188', 'contacted', 'social_media')
ON CONFLICT (id) DO NOTHING;

-- =====================
-- DEALS
-- =====================
INSERT INTO deals (id, title, customer_id, value, stage, probability, expected_close_date) VALUES
('60000000-0000-0000-0000-000000000001', '500-Unit Edge Controller Supply Contract', '40000000-0000-0000-0000-000000000001', 62500.00, 'negotiation', 85, CURRENT_DATE + 14),
('60000000-0000-0000-0000-000000000002', 'Factory Lighting Retrofit Q3', '40000000-0000-0000-0000-000000000002', 128000.00, 'proposal', 70, CURRENT_DATE + 21),
('60000000-0000-0000-0000-000000000003', 'Annual Industrial Bearings Framework', '40000000-0000-0000-0000-000000000003', 45000.00, 'closed_won', 100, CURRENT_DATE - 2),
('60000000-0000-0000-0000-000000000004', 'Smart Warehouse Automation Kit', '40000000-0000-0000-0000-000000000004', 95000.00, 'needs_analysis', 50, CURRENT_DATE + 30),
('60000000-0000-0000-0000-000000000005', 'Annual Safety Equipment Supply', '40000000-0000-0000-0000-000000000007', 38000.00, 'qualification', 30, CURRENT_DATE + 45)
ON CONFLICT (id) DO NOTHING;
