import { Link } from 'src/components/link'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'

const Home = () => (
  <>
    <SEO title="Home" />
    <div>Home</div>
    <div>
      <Link href="/new-item">New item</Link>
    </div>
  </>
)

export default withAuth(Home)
