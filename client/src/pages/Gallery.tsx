import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function Gallery() {
  const { id } = useParams()
  return (
    <Box>
      <h1>Gallery {id}</h1>
    </Box>
  )
}

export default Gallery
