export interface Schedule {
  schedule: {
    id: number;
    from: string;
    to: string;
  };
  employee: {
    id: string;
    userName: string;
    role: string;
  };
}

export interface Workday {
  id: number;
  isOpen: boolean;
  date: string;
  openingTime: string | null;
  closingTime: string | null;
}

export interface WorkdayDetails {
  workday: Workday;
  schedules: Schedule[];
}
