declare type Achievement = {
  title: string
  subtitle: string
  imageUrl: string | null
  startDate: string | null
  endDate: string | null
}

declare type ContactInformation = {
  name: string
  link: string
}

declare type Highlight = {
  name: string
  description: string
  date: string
  imageUrl: string | null
}

declare type Maintainer = {
  name: string
  headline: string
  bio: string
  imageUrl: string | null
}

declare type OpenGraphData = {
  title: string
  description: string
  type: string
  imageUrl: string
}

declare type Skill = {
  name: string
  score: number | null
  imageUrl: string | null
}