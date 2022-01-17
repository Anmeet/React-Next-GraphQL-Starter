import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  const { data, loading } = useMeQuery({ skip: isServer() })

  let body = null

  //data is loading
  if (loading) {
  }
  //user not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}> login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={async () => {
            await logout()
            router.reload()
          }}
          variant='link'
        >
          logout
        </Button>
      </Flex>
    )
  }
  return (
    <Flex zIndex={1} position='sticky' top={0} bg='tan' p={4}>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <NextLink href='/'>
          <Heading>Demo</Heading>
        </NextLink>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  )
}
