import { Link } from 'src/components/link'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'

const NewItem = () => (
  <>
    <SEO title="NewItem" />
    <div>New item</div>
    <div>
      <Link href="/">Home</Link>
    </div>
  </>
)

export default withAuth(NewItem)
