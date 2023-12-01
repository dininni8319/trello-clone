import { CardContainer } from "../style/style"

interface CardProps {
  text: string
}

export const Card = ({ text }: CardProps) => {
  return (
    <CardContainer>{text}</CardContainer>
  )
}