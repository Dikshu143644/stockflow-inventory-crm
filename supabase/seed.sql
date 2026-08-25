-- =============================================================================
-- StockFlow Inventory CRM - Comprehensive Seed Data
-- =============================================================================
-- This file contains idempotent seed data for development and testing.
-- All INSERT statements use ON CONFLICT DO NOTHING for safe re-runs.
-- All prices are in INR (Indian Rupees).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ROLES
-- -----------------------------------------------------------------------------
INSERT INTO roles (id, name, description, is_system, permissions) VALUES
('11111111-1111-1111-1111-111111111111', 'admin', 'Administrator with full system access', true, '{"all": true}'),
('22222222-2222-2222-2222-222222222222', 'manager', 'Operations and CRM manager', true, '{"inventory": true, "crm": true, "sales": true, "procurement": true, "reports": true}'),
('33333333-3333-3333-3333-333333333333', 'staff', 'Inventory and warehouse staff', true, '{"inventory": true, "sales_read": true}'),
('44444444-4444-4444-4444-444444444444', 'client', 'Client / Viewer access', true, '{"dashboard": true, "sales_orders": true, "invoices": true}'),
('55555555-5555-5555-5555-555555555555', 'viewer', 'Basic viewer access', true, '{"dashboard": true}')
ON CONFLICT (name) DO NOTHING;

-- -----------------------------------------------------------------------------
-- BRANCHES
-- -----------------------------------------------------------------------------
INSERT INTO branches (id, name, code, city, state, country, is_active) VALUES
('b1111111-1111-1111-1111-111111111111', 'Mumbai Central Hub', 'BR-MUM', 'Mumbai', 'Maharashtra', 'India', true),
('b2222222-2222-2222-2222-222222222222', 'Delhi Logistics Center', 'BR-DEL', 'New Delhi', 'Delhi', 'India', true),
('b3333333-3333-3333-3333-333333333333', 'Bengaluru Tech Warehouse', 'BR-BLR', 'Bengaluru', 'Karnataka', 'India', true)
ON CONFLICT (code) DO NOTHING;

-- -----------------------------------------------------------------------------
-- WAREHOUSES
-- -----------------------------------------------------------------------------
INSERT INTO warehouses (id, name, code, address, city, state, is_active) VALUES
('10000000-0000-0000-0000-000000000001', 'West Coast Warehouse', 'WH-MUM', 'Andheri East Industrial Zone, MIDC', 'Mumbai', 'Maharashtra', true),
('10000000-0000-0000-0000-000000000002', 'North Hub Depot', 'WH-DEL', 'Okhla Phase III, Industrial Area', 'New Delhi', 'Delhi', true),
('10000000-0000-0000-0000-000000000003', 'South Tech Center', 'WH-BLR', 'Electronic City Phase 1, Hosur Road', 'Bengaluru', 'Karnataka', true)
ON CONFLICT (code) DO NOTHING;

-- -----------------------------------------------------------------------------
-- CATEGORIES (5 categories as specified)
-- -----------------------------------------------------------------------------
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
('20000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Circuit boards, microcontrollers, sensors, and electronic components', 1),
('20000000-0000-0000-0000-000000000002', 'Industrial Parts', 'industrial-parts', 'Servo motors, precision bearings, actuators, and mechanical components', 2),
('20000000-0000-0000-0000-000000000003', 'Office Supplies', 'office-supplies', 'Stationery, printer consumables, furniture, and workplace essentials', 3),
('20000000-0000-0000-0000-000000000004', 'Raw Materials', 'raw-materials', 'Metals, plastics, composites, and chemical compounds for manufacturing', 4),
('20000000-0000-0000-0000-000000000005', 'Packaging', 'packaging', 'Corrugated boxes, bubble wrap, tapes, labels, and shipping supplies', 5)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------------------------
-- PRODUCTS - Electronics (15 products)
-- -----------------------------------------------------------------------------
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, is_active) VALUES
('30000000-0000-0000-0000-000000000001', 'Arduino Uno R3 Microcontroller', 'ELEC-ARD-001', '20000000-0000-0000-0000-000000000001', 'ATmega328P based development board with 14 digital I/O pins and 6 analog inputs', 1850.00, 1200.00, 50, true),
('30000000-0000-0000-0000-000000000002', 'Raspberry Pi 4 Model B 8GB', 'ELEC-RPI-002', '20000000-0000-0000-0000-000000000001', 'Quad-core Cortex-A72 SBC with 8GB LPDDR4 RAM, dual micro-HDMI, USB 3.0', 5999.00, 4200.00, 30, true),
('30000000-0000-0000-0000-000000000003', 'ESP32-WROOM-32 WiFi Module', 'ELEC-ESP-003', '20000000-0000-0000-0000-000000000001', 'Dual-core 240MHz MCU with integrated WiFi and Bluetooth 4.2 BLE', 450.00, 280.00, 100, true),
('30000000-0000-0000-0000-000000000004', '16x2 LCD Display Module (I2C)', 'ELEC-LCD-004', '20000000-0000-0000-0000-000000000001', 'HD44780 controller based LCD with PCF8574 I2C backpack, blue backlight', 320.00, 180.00, 75, true),
('30000000-0000-0000-0000-000000000005', 'DHT22 Temperature Humidity Sensor', 'ELEC-DHT-005', '20000000-0000-0000-0000-000000000001', 'Digital temperature and humidity sensor, 0-100% RH, -40 to 80C accuracy +/-0.5C', 550.00, 320.00, 60, true),
('30000000-0000-0000-0000-000000000006', 'OLED Display 0.96 inch SSD1306', 'ELEC-OLE-006', '20000000-0000-0000-0000-000000000001', '128x64 pixel I2C/SPI OLED display module with SSD1306 driver chip', 380.00, 220.00, 80, true),
('30000000-0000-0000-0000-000000000007', 'PCB Prototype Board FR-4 (10-pack)', 'ELEC-PCB-007', '20000000-0000-0000-0000-000000000001', '70x90mm double-sided copper clad FR-4 laminate PCB blanks, 1.6mm thick', 650.00, 380.00, 40, true),
('30000000-0000-0000-0000-000000000008', 'STM32F103C8T6 Blue Pill Board', 'ELEC-STM-008', '20000000-0000-0000-0000-000000000001', 'ARM Cortex-M3 72MHz MCU board with 64KB Flash, USB programming', 420.00, 250.00, 45, true),
('30000000-0000-0000-0000-000000000009', 'Soldering Station 60W Digital', 'ELEC-SOL-009', '20000000-0000-0000-0000-000000000001', 'ESD-safe adjustable temperature soldering iron 200-480C with stand', 2800.00, 1850.00, 15, true),
('30000000-0000-0000-0000-000000000010', 'LM2596 Buck Converter Module', 'ELEC-LM2-010', '20000000-0000-0000-0000-000000000001', 'DC-DC step-down adjustable voltage regulator 1.25V-35V, 3A max output', 180.00, 95.00, 100, true),
('30000000-0000-0000-0000-000000000011', 'Capacitor Kit 0.1uF-1000uF (500pcs)', 'ELEC-CAP-011', '20000000-0000-0000-0000-000000000001', 'Assorted electrolytic and ceramic capacitor kit, 24 values, through-hole', 1200.00, 720.00, 25, true),
('30000000-0000-0000-0000-000000000012', 'Relay Module 4-Channel 5V', 'ELEC-RLY-012', '20000000-0000-0000-0000-000000000001', 'Optocoupler isolated 4-channel relay board, 10A/250VAC switching capacity', 480.00, 290.00, 40, true),
('30000000-0000-0000-0000-000000000013', 'Logic Analyzer 8-Channel USB', 'ELEC-LOG-013', '20000000-0000-0000-0000-000000000001', 'Saleae-compatible 8-channel logic analyzer, 24MHz sampling, with probes', 1650.00, 980.00, 20, true),
('30000000-0000-0000-0000-000000000014', 'Thermal Paste TG-7 Extreme 50g', 'ELEC-THP-014', '20000000-0000-0000-0000-000000000001', 'High thermal conductivity 14.5 W/mK non-conductive thermal interface compound', 890.00, 520.00, 35, true),
('30000000-0000-0000-0000-000000000015', 'Precision Resistor Kit 1/4W (2500pcs)', 'ELEC-RES-015', '20000000-0000-0000-0000-000000000001', '0.1% tolerance metal film resistors, 50 values from 10 Ohm to 1M Ohm', 1450.00, 880.00, 20, true)
ON CONFLICT (sku) DO NOTHING;

-- -----------------------------------------------------------------------------
-- PRODUCTS - Industrial Parts (14 products)
-- -----------------------------------------------------------------------------
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, is_active) VALUES
('30000000-0000-0000-0000-000000000016', 'NEMA 23 Stepper Motor 2.8A', 'INDP-NEM-016', '20000000-0000-0000-0000-000000000002', 'Bipolar stepper motor 1.8 degree step angle, 1.26Nm holding torque', 3200.00, 2100.00, 20, true),
('30000000-0000-0000-0000-000000000017', 'AC Servo Motor 750W with Driver', 'INDP-SRV-017', '20000000-0000-0000-0000-000000000002', 'Brushless AC servo motor with 17-bit encoder and matched servo driver', 28500.00, 19800.00, 8, true),
('30000000-0000-0000-0000-000000000018', '6205-2RS Deep Groove Ball Bearing', 'INDP-BRG-018', '20000000-0000-0000-0000-000000000002', 'Sealed radial ball bearing 25x52x15mm, ABEC-5 precision grade', 380.00, 220.00, 100, true),
('30000000-0000-0000-0000-000000000019', 'Linear Guide Rail MGN12H 400mm', 'INDP-LGR-019', '20000000-0000-0000-0000-000000000002', 'Miniature linear motion guide with carriage block, preloaded C0', 1850.00, 1150.00, 25, true),
('30000000-0000-0000-0000-000000000020', 'Pneumatic Cylinder SC50x100', 'INDP-PNC-020', '20000000-0000-0000-0000-000000000002', 'Double-acting standard pneumatic air cylinder, 50mm bore, 100mm stroke', 2400.00, 1550.00, 15, true),
('30000000-0000-0000-0000-000000000021', 'Timing Belt GT2 6mm (5m roll)', 'INDP-TBT-021', '20000000-0000-0000-0000-000000000002', 'Open-ended GT2 rubber timing belt with fiberglass reinforcement, 6mm width', 650.00, 380.00, 30, true),
('30000000-0000-0000-0000-000000000022', 'Planetary Gearbox 10:1 Ratio', 'INDP-PGB-022', '20000000-0000-0000-0000-000000000002', 'NEMA 23 flange precision planetary speed reducer, backlash less than 15 arcmin', 4800.00, 3200.00, 10, true),
('30000000-0000-0000-0000-000000000023', 'Ball Screw SFU1605 (500mm)', 'INDP-BSC-023', '20000000-0000-0000-0000-000000000002', 'C7 precision rolled ball screw with nut, 16mm dia, 5mm lead pitch', 3500.00, 2300.00, 12, true),
('30000000-0000-0000-0000-000000000024', 'Flexible Coupling 8mm-10mm', 'INDP-CPL-024', '20000000-0000-0000-0000-000000000002', 'CNC aluminium spider jaw coupling for stepper motor shaft connection', 280.00, 160.00, 50, true),
('30000000-0000-0000-0000-000000000025', 'Industrial Limit Switch ME-8108', 'INDP-LSW-025', '20000000-0000-0000-0000-000000000002', 'Roller lever type momentary limit switch, 5A 250VAC, IP65 rated', 220.00, 130.00, 60, true),
('30000000-0000-0000-0000-000000000026', 'VFD Inverter 2.2kW Single Phase', 'INDP-VFD-026', '20000000-0000-0000-0000-000000000002', 'Variable frequency drive for 3-phase AC motor control, 0-400Hz', 8500.00, 5800.00, 5, true),
('30000000-0000-0000-0000-000000000027', 'Hydraulic Cylinder 40mm Bore', 'INDP-HYD-027', '20000000-0000-0000-0000-000000000002', 'Double-acting hydraulic ram, 40mm bore x 200mm stroke, 160 bar max', 6200.00, 4100.00, 8, true),
('30000000-0000-0000-0000-000000000028', 'Linear Actuator 12V 150mm Stroke', 'INDP-LAC-028', '20000000-0000-0000-0000-000000000002', 'Electric linear actuator 750N force, 10mm/s speed, built-in limit switches', 3800.00, 2500.00, 12, true),
('30000000-0000-0000-0000-000000000029', 'Proximity Sensor Inductive M18', 'INDP-PRX-029', '20000000-0000-0000-0000-000000000002', 'NPN NO inductive proximity switch, 8mm sensing distance, DC 10-30V', 750.00, 450.00, 40, true)
ON CONFLICT (sku) DO NOTHING;

-- -----------------------------------------------------------------------------
-- PRODUCTS - Office Supplies (12 products)
-- -----------------------------------------------------------------------------
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, is_active) VALUES
('30000000-0000-0000-0000-000000000030', 'A4 Copier Paper 75gsm (5 Ream)', 'OFFC-A4P-030', '20000000-0000-0000-0000-000000000003', 'JK Copier A4 size multipurpose paper, 500 sheets per ream, 5 ream box', 1650.00, 1150.00, 30, true),
('30000000-0000-0000-0000-000000000031', 'HP 12A Toner Cartridge (Twin Pack)', 'OFFC-TNR-031', '20000000-0000-0000-0000-000000000003', 'Original HP Q2612A black toner for LaserJet 1020/1022/3050, 2000 pages each', 4200.00, 2900.00, 15, true),
('30000000-0000-0000-0000-000000000032', 'Ergonomic Office Chair High-Back', 'OFFC-CHR-032', '20000000-0000-0000-0000-000000000003', 'Mesh back lumbar support office chair with adjustable armrests and headrest', 12500.00, 8200.00, 5, true),
('30000000-0000-0000-0000-000000000033', 'Whiteboard Marker Set (12 colors)', 'OFFC-WBM-033', '20000000-0000-0000-0000-000000000003', 'Non-toxic dry erase markers with bullet tip, assorted colors set', 480.00, 290.00, 40, true),
('30000000-0000-0000-0000-000000000034', 'File Folder Box (50-pack)', 'OFFC-FLD-034', '20000000-0000-0000-0000-000000000003', 'A4 size PP spring file folders with metal clip, assorted colors', 1800.00, 1100.00, 20, true),
('30000000-0000-0000-0000-000000000035', 'Desktop Organizer 5-Tier', 'OFFC-ORG-035', '20000000-0000-0000-0000-000000000003', 'Metal mesh desk organizer with 5 sliding trays and pen holder section', 1250.00, 780.00, 15, true),
('30000000-0000-0000-0000-000000000036', 'Sticky Notes 3x3 inch (12-pack)', 'OFFC-STK-036', '20000000-0000-0000-0000-000000000003', 'Self-adhesive repositionable notes, 100 sheets per pad, pastel colors', 360.00, 210.00, 50, true),
('30000000-0000-0000-0000-000000000037', 'Laminating Machine A3 Size', 'OFFC-LAM-037', '20000000-0000-0000-0000-000000000003', 'Thermal laminator for A3/A4 pouches, 80-250 micron, 3 minute warm-up', 4500.00, 2900.00, 8, true),
('30000000-0000-0000-0000-000000000038', 'Paper Shredder Cross-Cut 10-Sheet', 'OFFC-SHR-038', '20000000-0000-0000-0000-000000000003', 'P-4 security level cross-cut shredder, 21L bin, auto-start/stop', 6800.00, 4500.00, 5, true),
('30000000-0000-0000-0000-000000000039', 'Stapler Heavy Duty 100-Sheet', 'OFFC-STP-039', '20000000-0000-0000-0000-000000000003', 'Spring-powered heavy duty stapler for up to 100 sheets, uses 23/13 staples', 1100.00, 680.00, 20, true),
('30000000-0000-0000-0000-000000000040', 'Binding Machine Comb 450-Sheet', 'OFFC-BND-040', '20000000-0000-0000-0000-000000000003', 'Manual comb binding machine, punches 21 holes, binds up to 450 sheets', 5200.00, 3400.00, 6, true),
('30000000-0000-0000-0000-000000000041', 'Calculator Scientific Casio FX-991EX', 'OFFC-CAL-041', '20000000-0000-0000-0000-000000000003', '552 functions, spreadsheet mode, QR code output, solar + battery', 1450.00, 950.00, 25, true)
ON CONFLICT (sku) DO NOTHING;

-- -----------------------------------------------------------------------------
-- PRODUCTS - Raw Materials (13 products)
-- -----------------------------------------------------------------------------
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, is_active) VALUES
('30000000-0000-0000-0000-000000000042', 'Aluminum Sheet 6061-T6 3mm (1200x600mm)', 'RAWM-ALS-042', '20000000-0000-0000-0000-000000000004', 'Aerospace grade aluminum alloy sheet, brushed finish, ideal for enclosures', 4200.00, 2800.00, 20, true),
('30000000-0000-0000-0000-000000000043', 'Mild Steel Flat Bar 25x6mm (6m)', 'RAWM-MSF-043', '20000000-0000-0000-0000-000000000004', 'IS 2062 grade mild steel flat bar for structural and fabrication work', 850.00, 550.00, 50, true),
('30000000-0000-0000-0000-000000000044', 'Copper Rod 12mm Dia (1m)', 'RAWM-CPR-044', '20000000-0000-0000-0000-000000000004', 'ETP grade pure copper round bar, excellent conductivity for electrical bus bars', 1800.00, 1200.00, 30, true),
('30000000-0000-0000-0000-000000000045', 'Acrylic Sheet Clear 5mm (1200x900mm)', 'RAWM-ACR-045', '20000000-0000-0000-0000-000000000004', 'Optical clarity cast acrylic PMMA sheet, UV resistant, laser cut ready', 2200.00, 1450.00, 15, true),
('30000000-0000-0000-0000-000000000046', 'Nylon 66 Block 50x100x200mm', 'RAWM-NYL-046', '20000000-0000-0000-0000-000000000004', 'Engineering grade PA66 nylon block for CNC machining, self-lubricating', 1600.00, 1050.00, 20, true),
('30000000-0000-0000-0000-000000000047', 'Stainless Steel Tube 304 25mm OD (3m)', 'RAWM-SST-047', '20000000-0000-0000-0000-000000000004', 'Seamless SS304 tube, 1.5mm wall thickness, mirror polished finish', 3800.00, 2500.00, 15, true),
('30000000-0000-0000-0000-000000000048', 'HDPE Sheet Black 10mm (1200x600mm)', 'RAWM-HDP-048', '20000000-0000-0000-0000-000000000004', 'High density polyethylene sheet, chemical resistant, food grade certified', 1400.00, 900.00, 20, true),
('30000000-0000-0000-0000-000000000049', 'Brass Sheet 1.5mm C26000 (300x300mm)', 'RAWM-BRS-049', '20000000-0000-0000-0000-000000000004', '70/30 cartridge brass sheet, ideal for decorative and electrical components', 2800.00, 1900.00, 25, true),
('30000000-0000-0000-0000-000000000050', 'Carbon Fiber Sheet 3K Twill 2mm (500x400mm)', 'RAWM-CFB-050', '20000000-0000-0000-0000-000000000004', '3K twill weave carbon fiber composite plate, high strength-to-weight ratio', 5500.00, 3600.00, 10, true),
('30000000-0000-0000-0000-000000000051', 'POM Delrin Rod 30mm Dia (1m)', 'RAWM-POM-051', '20000000-0000-0000-0000-000000000004', 'Acetal homopolymer rod for precision machined gears and bushings', 1100.00, 720.00, 25, true),
('30000000-0000-0000-0000-000000000052', 'Rubber Sheet Neoprene 3mm (1m x 1m)', 'RAWM-RBR-052', '20000000-0000-0000-0000-000000000004', 'Oil and weather resistant neoprene rubber, 60 Shore A hardness, for gaskets', 1800.00, 1150.00, 15, true),
('30000000-0000-0000-0000-000000000053', 'Titanium Bar Grade 5 12mm (300mm)', 'RAWM-TIT-053', '20000000-0000-0000-0000-000000000004', 'Ti-6Al-4V aerospace grade titanium round bar for high-performance parts', 8500.00, 5800.00, 8, true),
('30000000-0000-0000-0000-000000000054', 'Fiberglass Cloth 200gsm (10m roll)', 'RAWM-FGL-054', '20000000-0000-0000-0000-000000000004', 'E-glass woven fiberglass fabric for composite layup and insulation', 2400.00, 1550.00, 12, true)
ON CONFLICT (sku) DO NOTHING;

-- -----------------------------------------------------------------------------
-- PRODUCTS - Packaging (12 products)
-- -----------------------------------------------------------------------------
INSERT INTO products (id, name, sku, category_id, description, selling_price, purchase_price, reorder_point, is_active) VALUES
('30000000-0000-0000-0000-000000000055', 'Corrugated Box 12x10x8 inch (25-pack)', 'PACK-CBX-055', '20000000-0000-0000-0000-000000000005', '3-ply corrugated shipping boxes, kraft brown, suitable for 5kg loads', 1250.00, 780.00, 40, true),
('30000000-0000-0000-0000-000000000056', 'Bubble Wrap Roll 1m x 100m', 'PACK-BBW-056', '20000000-0000-0000-0000-000000000005', '10mm bubble diameter air cushion wrap roll for fragile item protection', 1800.00, 1100.00, 20, true),
('30000000-0000-0000-0000-000000000057', 'BOPP Tape Clear 48mm x 65m (6-pack)', 'PACK-TPE-057', '20000000-0000-0000-0000-000000000005', 'Heavy duty self-adhesive packing tape, 45 micron thickness, strong seal', 420.00, 260.00, 60, true),
('30000000-0000-0000-0000-000000000058', 'Air Pillow Cushion Machine + 1 Roll', 'PACK-APC-058', '20000000-0000-0000-0000-000000000005', 'On-demand air pillow maker with 200m HDPE film roll, adjustable fill', 15000.00, 10200.00, 3, true),
('30000000-0000-0000-0000-000000000059', 'Stretch Film 18 inch x 1500ft (4-pack)', 'PACK-STF-059', '20000000-0000-0000-0000-000000000005', '80 gauge cast stretch wrap for pallet wrapping, clear, pre-stretched', 3200.00, 2100.00, 15, true),
('30000000-0000-0000-0000-000000000060', 'Thermal Shipping Labels 4x6 (1000-roll)', 'PACK-LBL-060', '20000000-0000-0000-0000-000000000005', 'Direct thermal labels compatible with Zebra/TSC printers, permanent adhesive', 950.00, 580.00, 30, true),
('30000000-0000-0000-0000-000000000061', 'Poly Mailer Bag 10x13 inch (100-pack)', 'PACK-PLM-061', '20000000-0000-0000-0000-000000000005', 'Self-seal polyethylene courier bags, tamper-evident, waterproof, white', 650.00, 380.00, 50, true),
('30000000-0000-0000-0000-000000000062', 'EPE Foam Sheet 20mm (10-pack)', 'PACK-EPE-062', '20000000-0000-0000-0000-000000000005', 'Expanded polyethylene foam sheets 600x400mm for cushioning electronics', 1100.00, 680.00, 25, true),
('30000000-0000-0000-0000-000000000063', 'Corrugated Box 24x18x12 inch (10-pack)', 'PACK-CBL-063', '20000000-0000-0000-0000-000000000005', '5-ply heavy duty corrugated boxes for industrial equipment, 20kg capacity', 1800.00, 1150.00, 20, true),
('30000000-0000-0000-0000-000000000064', 'Desiccant Silica Gel 50g (100-pack)', 'PACK-DSC-064', '20000000-0000-0000-0000-000000000005', 'Moisture absorbing sachets for protecting electronics during shipping', 1400.00, 880.00, 30, true),
('30000000-0000-0000-0000-000000000065', 'Anti-Static Bubble Bag 8x10 (50-pack)', 'PACK-ASB-065', '20000000-0000-0000-0000-000000000005', 'Pink anti-static bubble pouches for PCBs and sensitive electronic components', 980.00, 620.00, 35, true),
('30000000-0000-0000-0000-000000000066', 'Kraft Paper Roll 24 inch x 200m', 'PACK-KPR-066', '20000000-0000-0000-0000-000000000005', '80gsm unbleached kraft wrapping paper for void fill and surface protection', 2200.00, 1400.00, 10, true)
ON CONFLICT (sku) DO NOTHING;

-- -----------------------------------------------------------------------------
-- INVENTORY LEVELS (all products across warehouses)
-- -----------------------------------------------------------------------------
INSERT INTO inventory (product_id, warehouse_id, quantity, reserved_quantity) VALUES
-- Electronics in Mumbai warehouse
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 142, 12),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 85, 8),
('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 320, 25),
('30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 180, 15),
('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 95, 10),
('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 210, 0),
('30000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', 65, 5),
('30000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000001', 110, 8),
('30000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000001', 22, 2),
('30000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000001', 450, 30),
('30000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000001', 38, 0),
('30000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000001', 90, 12),
('30000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000001', 28, 3),
('30000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000001', 75, 0),
('30000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000001', 42, 5),
-- Industrial Parts in Delhi warehouse
('30000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000002', 45, 5),
('30000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000002', 12, 2),
('30000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000002', 280, 40),
('30000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000002', 55, 8),
('30000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000002', 30, 4),
('30000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000002', 68, 10),
('30000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000002', 18, 3),
('30000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000002', 22, 2),
('30000000-0000-0000-0000-000000000024', '10000000-0000-0000-0000-000000000002', 120, 15),
('30000000-0000-0000-0000-000000000025', '10000000-0000-0000-0000-000000000002', 150, 20),
('30000000-0000-0000-0000-000000000026', '10000000-0000-0000-0000-000000000002', 8, 1),
('30000000-0000-0000-0000-000000000027', '10000000-0000-0000-0000-000000000002', 14, 2),
('30000000-0000-0000-0000-000000000028', '10000000-0000-0000-0000-000000000002', 25, 3),
('30000000-0000-0000-0000-000000000029', '10000000-0000-0000-0000-000000000002', 90, 10),
-- Office Supplies in Bengaluru warehouse
('30000000-0000-0000-0000-000000000030', '10000000-0000-0000-0000-000000000003', 85, 10),
('30000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000003', 42, 5),
('30000000-0000-0000-0000-000000000032', '10000000-0000-0000-0000-000000000003', 15, 2),
('30000000-0000-0000-0000-000000000033', '10000000-0000-0000-0000-000000000003', 110, 8),
('30000000-0000-0000-0000-000000000034', '10000000-0000-0000-0000-000000000003', 60, 5),
('30000000-0000-0000-0000-000000000035', '10000000-0000-0000-0000-000000000003', 35, 3),
('30000000-0000-0000-0000-000000000036', '10000000-0000-0000-0000-000000000003', 200, 15),
('30000000-0000-0000-0000-000000000037', '10000000-0000-0000-0000-000000000003', 12, 1),
('30000000-0000-0000-0000-000000000038', '10000000-0000-0000-0000-000000000003', 8, 0),
('30000000-0000-0000-0000-000000000039', '10000000-0000-0000-0000-000000000003', 45, 4),
('30000000-0000-0000-0000-000000000040', '10000000-0000-0000-0000-000000000003', 10, 1),
('30000000-0000-0000-0000-000000000041', '10000000-0000-0000-0000-000000000003', 65, 8),
-- Raw Materials in Mumbai warehouse
('30000000-0000-0000-0000-000000000042', '10000000-0000-0000-0000-000000000001', 35, 5),
('30000000-0000-0000-0000-000000000043', '10000000-0000-0000-0000-000000000001', 120, 15),
('30000000-0000-0000-0000-000000000044', '10000000-0000-0000-0000-000000000001', 60, 8),
('30000000-0000-0000-0000-000000000045', '10000000-0000-0000-0000-000000000001', 28, 3),
('30000000-0000-0000-0000-000000000046', '10000000-0000-0000-0000-000000000001', 40, 5),
('30000000-0000-0000-0000-000000000047', '10000000-0000-0000-0000-000000000001', 22, 2),
('30000000-0000-0000-0000-000000000048', '10000000-0000-0000-0000-000000000001', 50, 6),
('30000000-0000-0000-0000-000000000049', '10000000-0000-0000-0000-000000000001', 45, 4),
('30000000-0000-0000-0000-000000000050', '10000000-0000-0000-0000-000000000001', 15, 2),
('30000000-0000-0000-0000-000000000051', '10000000-0000-0000-0000-000000000001', 55, 5),
('30000000-0000-0000-0000-000000000052', '10000000-0000-0000-0000-000000000001', 30, 3),
('30000000-0000-0000-0000-000000000053', '10000000-0000-0000-0000-000000000001', 10, 1),
('30000000-0000-0000-0000-000000000054', '10000000-0000-0000-0000-000000000001', 18, 2),
-- Packaging in Delhi warehouse
('30000000-0000-0000-0000-000000000055', '10000000-0000-0000-0000-000000000002', 95, 10),
('30000000-0000-0000-0000-000000000056', '10000000-0000-0000-0000-000000000002', 35, 5),
('30000000-0000-0000-0000-000000000057', '10000000-0000-0000-0000-000000000002', 180, 20),
('30000000-0000-0000-0000-000000000058', '10000000-0000-0000-0000-000000000002', 5, 0),
('30000000-0000-0000-0000-000000000059', '10000000-0000-0000-0000-000000000002', 28, 4),
('30000000-0000-0000-0000-000000000060', '10000000-0000-0000-0000-000000000002', 75, 10),
('30000000-0000-0000-0000-000000000061', '10000000-0000-0000-0000-000000000002', 140, 15),
('30000000-0000-0000-0000-000000000062', '10000000-0000-0000-0000-000000000002', 55, 5),
('30000000-0000-0000-0000-000000000063', '10000000-0000-0000-0000-000000000002', 40, 3),
('30000000-0000-0000-0000-000000000064', '10000000-0000-0000-0000-000000000002', 85, 8),
('30000000-0000-0000-0000-000000000065', '10000000-0000-0000-0000-000000000002', 70, 5),
('30000000-0000-0000-0000-000000000066', '10000000-0000-0000-0000-000000000002', 18, 2)
ON CONFLICT (product_id, warehouse_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- CUSTOMERS (12 customers with Indian business names)
-- -----------------------------------------------------------------------------
INSERT INTO customers (id, company_name, contact_person, email, phone, customer_type, credit_limit, is_active) VALUES
('40000000-0000-0000-0000-000000000001', 'Tata Advanced Systems Ltd', 'Rajiv Nair', 'procurement@tataadvanced.co.in', '+91 22 6665 8000', 'wholesale', 2500000.00, true),
('40000000-0000-0000-0000-000000000002', 'Reliance Industrial Solutions', 'Priya Sharma', 'orders@relianceindsol.com', '+91 22 3555 7000', 'distributor', 5000000.00, true),
('40000000-0000-0000-0000-000000000003', 'Wipro Infrastructure Engineering', 'Dr. Alok Verma', 'contact@wiproinfra.com', '+91 80 2844 0000', 'wholesale', 1800000.00, true),
('40000000-0000-0000-0000-000000000004', 'Mahindra CIE Automotive', 'Vikram Deshmukh', 'vikram.d@mahindracie.com', '+91 20 6648 5000', 'wholesale', 3200000.00, true),
('40000000-0000-0000-0000-000000000005', 'Godrej Precision Engineering', 'Arun Krishnamurthy', 'arun.k@godrejprecision.com', '+91 22 6797 4000', 'regular', 1500000.00, true),
('40000000-0000-0000-0000-000000000006', 'Bharat Electronics Ltd', 'Sneha Reddy', 'sneha.reddy@bel-india.in', '+91 80 2503 9000', 'wholesale', 4000000.00, true),
('40000000-0000-0000-0000-000000000007', 'Larsen & Toubro Technology', 'Deepak Menon', 'deepak.menon@ltts.com', '+91 22 6776 0000', 'distributor', 6000000.00, true),
('40000000-0000-0000-0000-000000000008', 'Kirloskar Pneumatic Co', 'Suresh Patil', 'suresh.patil@kirloskar.com', '+91 20 2444 0505', 'regular', 900000.00, true),
('40000000-0000-0000-0000-000000000009', 'HCL CAM Engineering', 'Neha Gupta', 'neha.gupta@hclcam.com', '+91 120 438 9000', 'wholesale', 2000000.00, true),
('40000000-0000-0000-0000-000000000010', 'Ashok Leyland Defence Systems', 'Ravi Kumar', 'ravi.kumar@ashokleyland.com', '+91 44 2220 6000', 'wholesale', 3500000.00, true),
('40000000-0000-0000-0000-000000000011', 'Sundaram Clayton Ltd', 'Meera Iyer', 'meera.iyer@sundaramclayton.com', '+91 44 2834 4000', 'regular', 1200000.00, true),
('40000000-0000-0000-0000-000000000012', 'Thermax Industrial Solutions', 'Amit Joshi', 'amit.joshi@thermaxglobal.com', '+91 20 6612 3000', 'distributor', 2800000.00, true)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- SUPPLIERS (7 suppliers)
-- -----------------------------------------------------------------------------
INSERT INTO suppliers (id, company_name, contact_person, email, phone, is_active) VALUES
('70000000-0000-0000-0000-000000000001', 'Mouser Electronics India Pvt Ltd', 'David Chang', 'india.orders@mouser.com', '+91 80 4265 5555', true),
('70000000-0000-0000-0000-000000000002', 'Bharat Precision Motors Pvt Ltd', 'Rajesh Kulkarni', 'sales@bharatprecision.in', '+91 22 2847 8899', true),
('70000000-0000-0000-0000-000000000003', 'Indo-Copper Smelting & Wireworks', 'Suresh Patel', 'commercial@indocopper.com', '+91 265 233 4455', true),
('70000000-0000-0000-0000-000000000004', 'Hindustan Steelworks Ltd', 'Pramod Mishra', 'orders@hindustansteel.co.in', '+91 33 2248 7600', true),
('70000000-0000-0000-0000-000000000005', 'Chennai Polymers & Plastics', 'Lakshmi Narayanan', 'lakshmi@chennaiplastics.com', '+91 44 2625 8800', true),
('70000000-0000-0000-0000-000000000006', 'Rajkot Industrial Bearings Co', 'Jignesh Shah', 'jignesh@rajkotbearings.in', '+91 281 246 5577', true),
('70000000-0000-0000-0000-000000000007', 'Shree Packaging Solutions', 'Anand Agarwal', 'anand@shreepack.co.in', '+91 11 2345 6789', true)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- CRM LEADS (8 leads)
-- -----------------------------------------------------------------------------
INSERT INTO leads (id, company_name, contact_person, email, phone, status, source) VALUES
('50000000-0000-0000-0000-000000000001', 'Mehta Industries Pvt Ltd', 'Vikram Mehta', 'vikram@mehtaindustries.in', '+91 98765 43210', 'qualified', 'website'),
('50000000-0000-0000-0000-000000000002', 'GlobalTech Systems India', 'Sarah Jenkins', 'sjenkins@globaltech.co.in', '+91 80 4155 0199', 'proposal', 'referral'),
('50000000-0000-0000-0000-000000000003', 'SolarDrive Energy Solutions', 'Ananya Deshmukh', 'ananya@solardrive.co.in', '+91 98222 33445', 'negotiation', 'trade_show'),
('50000000-0000-0000-0000-000000000004', 'Pinnacle Automation Systems', 'Karthik Rajan', 'karthik@pinnacleauto.in', '+91 44 4220 5566', 'new', 'cold_call'),
('50000000-0000-0000-0000-000000000005', 'Zenith Power Electronics', 'Harsh Agarwal', 'harsh@zenithpower.com', '+91 11 4567 8901', 'qualified', 'website'),
('50000000-0000-0000-0000-000000000006', 'Navneet Engineering Works', 'Paresh Trivedi', 'paresh@navneeteng.co.in', '+91 79 2656 7788', 'contacted', 'exhibition'),
('50000000-0000-0000-0000-000000000007', 'OceanBlue Marine Systems', 'Capt. Fernandes', 'fernandes@oceanblue.co.in', '+91 832 245 6677', 'proposal', 'referral'),
('50000000-0000-0000-0000-000000000008', 'Shriram EPC Ltd', 'Vivek Chandra', 'vivek.c@shriramepc.com', '+91 44 2852 3344', 'negotiation', 'website')
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- DEALS (7 deals)
-- -----------------------------------------------------------------------------
INSERT INTO deals (id, title, customer_id, value, stage, probability, expected_close_date) VALUES
('60000000-0000-0000-0000-000000000001', 'Annual Electronics Component Supply - FY25', '40000000-0000-0000-0000-000000000001', 1250000.00, 'negotiation', 85, CURRENT_DATE + 14),
('60000000-0000-0000-0000-000000000002', 'Factory Automation Retrofit Project', '40000000-0000-0000-0000-000000000002', 3800000.00, 'proposal', 60, CURRENT_DATE + 45),
('60000000-0000-0000-0000-000000000003', 'Industrial Bearings Framework Agreement', '40000000-0000-0000-0000-000000000003', 950000.00, 'closed_won', 100, CURRENT_DATE - 5),
('60000000-0000-0000-0000-000000000004', 'CNC Machine Parts Bulk Order', '40000000-0000-0000-0000-000000000004', 2200000.00, 'qualification', 40, CURRENT_DATE + 60),
('60000000-0000-0000-0000-000000000005', 'Packaging Solution for Export Division', '40000000-0000-0000-0000-000000000005', 680000.00, 'closed_won', 100, CURRENT_DATE - 12),
('60000000-0000-0000-0000-000000000006', 'Defence Electronics Module Supply', '40000000-0000-0000-0000-000000000006', 5500000.00, 'proposal', 55, CURRENT_DATE + 90),
('60000000-0000-0000-0000-000000000007', 'Office Infrastructure Setup - New Campus', '40000000-0000-0000-0000-000000000007', 1800000.00, 'negotiation', 75, CURRENT_DATE + 21)
ON CONFLICT (id) DO NOTHING;
