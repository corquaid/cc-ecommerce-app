import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { LeftArrow } from '@/components/Icons/LeftArrow'
import { Product } from '@/types'

export default function ProductDetail({
  productDetails,
}: {
  productDetails: Product
}) {
  const router = useRouter()
  const [inCart, setInCart] = useState(false)

  const handleAddToCart = () => {
    setInCart(true)
    setTimeout(() => {
      setInCart(false)
    }, 2000)
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <Head>
        <title>{`CQ Clothing | ${productDetails.title}`}</title>
      </Head>
      <div className="container mx-auto mt-8">
        <div className="grid xl:grid-cols-8">
          <Link href="/" className="hover:underline underline-offset-4 w-fit">
            <div className="text-gray-900 border-white duration-75 w-fit mb-8">
              <LeftArrow />
            </div>
          </Link>
          <div className="grid lg:col-start-2 lg:col-span-6 grid-cols-1 md:grid-cols-2 lg:mt-8">
            <Image
              src={productDetails.image}
              alt={productDetails.title}
              width="0"
              height="0"
              sizes="100vw"
              priority
              className="object-contain h-auto w-72 mx-auto mb-4 md:mb-0"
            />
            <div className="grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700 text-2xl mt-8 md:mt-0 mb-2">
                {productDetails.title}
              </p>

              <div>
                <p className="text-gray-900 mb-8 text-lg font-bold">
                  ${productDetails.price.toFixed(2)}
                </p>
                <p className="mb-8 md:text-justify font-light">
                  {productDetails.description}
                </p>
                <button
                  onClick={handleAddToCart}
                  className={`${
                    inCart ? 'bg-green-500' : 'bg-blue-500'
                  } text-white px-4 py-2 rounded w-full duration-100`}
                >
                  {inCart ? 'Added to cart!' : 'Add to cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const result = await axios.get('https://fakestoreapi.com/products')

    const ids: number[] = result.data.map((product: Product) => product.id)

    const paths = ids.map((id) => ({ params: { id: id.toString() } }))

    return {
      paths,
      fallback: true,
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        err: 'Something went wrong',
      },
    }
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/${params.id}`,
    )
    return {
      props: {
        productDetails: data,
      },
      revalidate: 60,
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        err: 'Something went wrong',
      },
    }
  }
}
