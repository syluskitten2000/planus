import { User } from './user';

export interface Report {
  id: string;
  reporter: User;
  reportedUser: User;
  type: 'spam' | 'abuse' | 'inappropriate' | 'other';
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  resolution?: string;
  resolvedBy?: User;
  resolvedAt?: Date;
}

export interface ReportType {
  id: string;
  name: string;
  reports: Report[];
} 