import { Supplier } from './models/supplier';
import { Product } from './models/product';
import { Headquarters } from './models/headquarters';
import { Branch } from './models/branch';
import { Order } from './models/order';
import { OrderDetail } from './models/orderDetail';
import { Delivery } from './models/delivery';
import { OrderDetailDelivery } from './models/orderDetailDelivery';

// Suppliers
export const suppliers: Supplier[] = [
    {
        supplierId: 1,
        name: "CircuitCore Labs",
        description: "Leading technology supplier",
        contactPerson: "John Smith",
        email: "john@circuitcorelabs.co",
        phone: "555-0101"
    },
    {
        supplierId: 2,
        name: "ConnectSphere",
        description: "Advanced tech products supplier",
        contactPerson: "Jane Doe",
        email: "jane@connectsphere.com",
        phone: "555-0102"
    }
];

// Products
export const products: Product[] = [
    {
        productId: 1,
        supplierId: 1,
        name: "PowerTool Pro X1",
        description: "High performance power tool with advanced features like smart sensors and ergonomic design.",
        price: 1299.99,
        sku: "PWR-001",
        unit: "piece",
        imgName: "powertool.png"
    },
    {
        productId: 2,
        supplierId: 1,
        name: "Webcam Pro",
        description: "Ergonomic webcam with 4K resolution and built-in AI features like auto-framing and background blur.",
        price: 49.99,
        sku: "WEB-001",
        unit: "piece",
        imgName: "webcam.png"
    },
    {
        productId: 3,
        supplierId: 2,
        name: "Rugged Hard Drive",
        description: "Advanced storage solution with high durability and fast data transfer speeds, perfect for field agents.",
        price: 99.99,
        sku: "HDD-001",
        unit: "piece",
        imgName: "harddrive.png"
    },
    {
        productId: 4,
        supplierId: 2,
        name: "Mic Pro",
        description: "Advanced audio mic with noise cancellation and smart connectivity features, battery power and USB-C charging.",
        price: 29.99,
        sku: "MIC-001",
        unit: "piece",
        imgName: "mic.png"
    },
    {
        productId: 5,
        supplierId: 1,
        name: "Smart Worklight",
        description: "A compact, magnetic LED worklight with motion detection and a green glow mode. Rechargeable with USB-C.",
        price: 79.99,
        sku: "LIGHT-001",
        unit: "piece",
        imgName: "work-light.png"
    },
    {
        productId: 6,
        supplierId: 1,
        name: "Precision Laser Level",
        description: "Sleek matte device for leveling and measuring in construction or home setups. Includes a green crosshair projection and auto-calibration.",
        price: 149.99,
        sku: "LEVEL-001",
        unit: "piece",
        imgName: "laser-level.png"
    },
    {
        productId: 7,
        supplierId: 1,
        name: "Modular Tool Battery Pack",
        description: "A universal battery module compatible with Octo Supply power tools and accessories. Features digital readout and neon green charge strip.",
        price: 89.99,
        sku: "BAT-001",
        unit: "piece",
        imgName: "battery-pack.png"
    },
    {
        productId: 8,
        supplierId: 2,
        name: "Autonomous Mini Shop Vac",
        description: "A smart, tabletop debris collector for small workspaces. Round, industrial look with rubberized base and animated LED feedback.",
        price: 199.99,
        sku: "VAC-001",
        unit: "piece",
        imgName: "shop-vac.png"
    },
    {
        productId: 9,
        supplierId: 2,
        name: "Wearable Field Beacon",
        description: "A small clip-on wearable device for warehouse or construction crews. GPS-enabled, with safety alerts and NFC sync to Octo Supply systems.",
        price: 129.99,
        sku: "BEACON-001",
        unit: "piece",
        imgName: "field-beacon.png"
    },
    {
        productId: 10,
        supplierId: 1,
        name: "Desk-Edge Utility Arm",
        description: "Futuristic articulated arm that clamps to a desk, used to hold lights, tools, microphones, or phones. Carbon black finish with green accents.",
        price: 159.99,
        sku: "ARM-001",
        unit: "piece",
        imgName: "robotic-desk-arm.png"
    },
    {
        productId: 11,
        supplierId: 1,
        name: "Smart Tape Measure",
        description: "Digital tape with a laser pointer, OLED screen, and data logging for dimensions. Auto-syncs to paired devices.",
        price: 69.99,
        sku: "TAPE-001",
        unit: "piece",
        imgName: "smart-tape-measure.png"
    },
    {
        productId: 12,
        supplierId: 2,
        name: "Industrial Label Printer",
        description: "Compact thermal printer for tool labeling or warehouse tags. Sleek black case with touch interface and lumo green output light.",
        price: 249.99,
        sku: "PRINT-001",
        unit: "piece",
        imgName: "label-printer.png"
    },
    {
        productId: 13,
        supplierId: 2,
        name: "Vibration-Dampening Gloves",
        description: "Smart gloves with embedded sensors that monitor tool usage and fatigue. Rechargeable and machine-washable.",
        price: 89.99,
        sku: "GLOVE-001",
        unit: "piece",
        imgName: "gloves.png"
    },
    {
        productId: 14,
        supplierId: 1,
        name: "Magnetic Tool Organizer Mat",
        description: "A flexible surface that holds and charges Octo Supply tools via embedded wireless charging coils. Futuristic surface texture with light indicators.",
        price: 129.99,
        sku: "MAT-001",
        unit: "piece",
        imgName: "organizer.png"
    },
    {
        productId: 15,
        supplierId: 2,
        name: "Smart Cat Toy",
        description: "A smart cat toy for entertaining your favorite Octocat. Battery powered with interactive features and a neon green glow.",
        price: 29.99,
        sku: "CAT-001",
        unit: "piece",
        imgName: "cat-toy.png"
    }
];

// Headquarters
export const headquarters: Headquarters[] = [
    {
        headquartersId: 1,
        name: "Main Office",
        description: "Corporate headquarters",
        address: "123 Main St, Business District",
        contactPerson: "Michael Johnson",
        email: "mjohnson@octo.com",
        phone: "555-0001"
    }
];

// Branches
export const branches: Branch[] = [
    {
        branchId: 1,
        headquartersId: 1,
        name: "Downtown Branch",
        description: "Main downtown location",
        address: "456 Market St",
        contactPerson: "Sarah Wilson",
        email: "swilson@octo.com",
        phone: "555-0201"
    },
    {
        branchId: 2,
        headquartersId: 1,
        name: "Westside Branch",
        description: "Western district branch",
        address: "789 West Ave",
        contactPerson: "Robert Brown",
        email: "rbrown@octo.com",
        phone: "555-0202"
    }
];

// Orders
export const orders: Order[] = [
    {
        orderId: 1,
        branchId: 1,
        orderDate: new Date().toISOString(),
        name: "Q1 Tech Supply",
        description: "Quarterly technology refresh",
        status: "pending"
    },
    {
        orderId: 2,
        branchId: 2,
        orderDate: new Date().toISOString(),
        name: "Office Supplies Restock",
        description: "Monthly office supplies restock",
        status: "processing"
    }
];

// Order Details
export const orderDetails: OrderDetail[] = [
    {
        orderDetailId: 1,
        orderId: 1,
        productId: 2,
        quantity: 5,
        unitPrice: 49.99,
        notes: "Webcams for new hires"
    },
    {
        orderDetailId: 2,
        orderId: 1,
        productId: 2,
        quantity: 5,
        unitPrice: 99.99,
        notes: "Harddrives for new field agents"
    },
    {
        orderDetailId: 3,
        orderId: 2,
        productId: 4,
        quantity: 20,
        unitPrice: 29.99,
        notes: "Mics for conference rooms"
    }
];

// Deliveries
export const deliveries: Delivery[] = [
    {
        deliveryId: 1,
        supplierId: 1,
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        name: "Tech Equipment Delivery",
        description: "Delivery of tech equipment",
        status: "pending"
    },
    {
        deliveryId: 2,
        supplierId: 2,
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        name: "Office Supplies Delivery",
        description: "Regular office tech supplies delivery",
        status: "in-transit"
    }
];

// Order Detail Deliveries
export const orderDetailDeliveries: OrderDetailDelivery[] = [
    {
        orderDetailDeliveryId: 1,
        orderDetailId: 1,
        deliveryId: 1,
        quantity: 5,
        notes: "Delivery batch"
    },
    {
        orderDetailDeliveryId: 2,
        orderDetailId: 2,
        deliveryId: 1,
        quantity: 5,
        notes: "Delivery batch"
    },
    {
        orderDetailDeliveryId: 3,
        orderDetailId: 3,
        deliveryId: 2,
        quantity: 20,
        notes: "Delivery"
    }
];