import styled from 'styled-components'
import PropTypes from 'prop-types'
import pfpExample from "./assets/pfp-example.png"

const CardWrapper = styled.div`
  background-color: #ffdbdb;
  border: 1px solid #000000;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #2a79cd;
  padding: 10px;
  text-align: center;
  width: 250px;
  height: 200px;
  display: inline-block;
  margin: 10px;
`

const CardImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`

const CardDescription = styled.p`
  font-size: 16px;
  color: #000000;
`

function Card(props) {
  return (
    <CardWrapper className="card-wrapper">
      <CardImage src={pfpExample} alt="card" />
      <CardTitle>{props.name}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardWrapper>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Card.defaultProps = {
  name: "Guest",
  description: "No description",
}

export default Card