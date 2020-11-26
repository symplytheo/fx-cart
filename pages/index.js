import Layout from '../components/Layout'
import { Box, Container, Grid } from '@material-ui/core'
import Head from '../components/core/Head'
import ProductCard from '../components/parts/ProductCard'

const HomePage = ({ data }) => {
  const products = data

  return (
    <Layout>
      <Head title="Welcome to FX Cart" />
      <Container maxWidth="md">
        <Box py={2}>
          <Grid container justify="center" spacing={3}>
            {products.map((item, v) => (
              <Grid key={v} item xs={12} sm={6} md={4}>
                <ProductCard product={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  let data = []
  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=12`)
    data = await res.json()
  } catch (error) {
    console.log(error)
  }
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data,
    }
  }
}

export default HomePage
