export interface Customer {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
  date_of_birth?: string;
  home_address?: string;
  date_of_registration: string;
  developer_honor: boolean;
  orders?: Order[];
}

export interface Order {
  id: number;
  order_date: string;
  menu_item: string;
  special_instructions?: string;
  payment_method: string;
  next_reservation_date?: string;
}

export type CustomerFormProps = {
  customer?: Customer;
  onSuccess: () => void;
  onCancel: () => void;
  onRefresh?: () => void
};