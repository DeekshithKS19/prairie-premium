export type UserRole = "admin" | "manager" | "user";

export type ShipmentType =
  | "Ocean Container"
  | "Bulk Vessel"
  | "Rail"
  | "Truck"
  | "Air Freight"
  | "Intermodal";

export type ShipmentStatus =
  | "Planning"
  | "In Production"
  | "Ready"
  | "Shipped"
  | "Delivered"
  | "Delayed";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approved: boolean;
  created_at: string;
}

export interface ExportRecord {
  id: string;
  company_name: string;
  po_number: string | null;
  work_order: string | null;
  destination_country: string;
  region: string;
  shipment_type: ShipmentType;
  production_complete_date: string | null;
  expected_ship_date: string | null;
  actual_ship_date: string | null;
  pallets: number | null;
  gross_weight: number | null;
  net_weight: number | null;
  container_number: string | null;
  carrier: string | null;
  bill_of_lading: string | null;
  export_reference: string | null;
  status: ShipmentStatus;
  remarks: string | null;
  days_until_shipment: number | null;
  late_shipment: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}