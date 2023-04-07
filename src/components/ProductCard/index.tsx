import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard(props: ProductCardProps) {
  return (
    <Link href={`/product/${props.product.id}`}>
      <div
        key={props.product.id}
        className="border border-gray-200 rounded p-5 cursor-pointer h-full hover:opacity-75 duration-200"
      >
        <Image
          src={props.product.image}
          alt={props.product.title}
          width="0"
          height="0"
          sizes="100vw"
          priority
          className="object-contain h-64 w-auto mx-auto mb-4"
        />
        <div className='min-w-0'>
          <p className="text-gray-700 mb-1 truncate">
            {props.product.title}
          </p>
          <p className="text-sm font-bold text-gray-900">${props.product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}
