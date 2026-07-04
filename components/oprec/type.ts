export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming";
}

export interface TimelineOprec {
  start: string;
  end: string;
}

export interface InformationHero {
  value: string;
  description: string;
}

export interface Requirement {
  icon: React.ReactNode;
  text: string;
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Course {
  name: string;
  code: string;
  slots: number;
}

export interface SubjectCategory {
  category: string;
  icon: React.ReactNode;
  courses: Course[];
}
