/**
 * Shared TypeScript types for course/project content across the site.
 */

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Track = 'PyTorch' | 'Transformers' | 'RL' | 'Production' | 'Math';

export interface CourseModule {
  id:         number;
  title:      string;
  desc:       string;
  isCapstone?: boolean;
  href?:      string;
}

export interface Course {
  slug:        string;
  title:       string;
  icon:        string;
  track:       Track;
  level:       DifficultyLevel;
  hours:       string;
  modules:     number;
  description: string;
}

export interface Project {
  slug:        string;
  title:       string;
  icon:        string;
  track:       Track;
  level:       DifficultyLevel;
  estimatedHours: string;
  description: string;
  tags:        string[];
}

export interface RoadmapPhase {
  id:       number;
  title:    string;
  duration: string;
  icon:     string;
  items:    RoadmapItem[];
}

export interface RoadmapItem {
  label: string;
  href?: string;
}
