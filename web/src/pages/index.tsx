import { Navbar } from '../components/Navbar'
import { usePostsQuery } from '../generated/graphql'
import { withApollo } from '../utils/withApollo'
import { Layout } from '../components/Layout'

const Index = () => {
  const { data } = usePostsQuery()
  return (
    <Layout>
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading ...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  )
}

export default withApollo({ ssr: true })(Index)
