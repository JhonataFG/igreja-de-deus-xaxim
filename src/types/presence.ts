
export interface PresenceEventProps {
  id: string;
  title: string;
  date: string;
  description: string | null;
  created_at: string;
}

export interface PresenceEventFormValues {
  title: string;
  date: string;
  description: string | null;
}

export interface MemberAttendanceProps {
  id: string;
  member_id: string;
  event_id: string;
  attended: boolean;
  notes: string | null;
  created_at: string;
}

export interface AttendanceSummary {
  eventId: string;
  eventTitle: string;
  date: string;
  totalMembers: number;
  presentMembers: number;
  attendancePercentage: number;
}

export interface MemberWithAttendance extends MemberProps {
  attendance: {
    id: string;
    attended: boolean;
    notes: string | null;
  } | null;
}
