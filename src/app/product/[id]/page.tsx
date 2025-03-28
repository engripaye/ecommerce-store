import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import { getProductById } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ChevronRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProductPage = async ( { params } : {params: Promise<{id: string }>} ) => {
  const {id} = await params;

  const product = await getProductById(id);

  if(!product.price) {
    return <div>Product not found</div>;
  }

  const originalPrice = product.price * 5;
  
    return (
    <div className='bg-gray-50'>
        <SalesCampaignBanner />

        {/* BreadCrumb Navigation */}
        <div className='bg-white border-b border-gray-200'>
            <div className='container mx-auto py-3 px-4'>
                <div className='flex items-center gap-2 text-sm'>
                <Link 
                    href='/'
                    className='text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1'
                >

                    < Home className='w-4 h-4'/>
                    <span>Home</span>

                
                </Link>
                <ChevronRight className='w-4 h-4 text-gray-400'/>
                <span className='text-gray-400 truncate'>
                    {product.title}
                </span>
 
                </div>
            </div>

        </div>

        {/* Product Sale Banner*/}

        <div className='bg-gradient-to-r from-red-500/10 to-red-600/10 py-6 px-4'>
        
        <div className='container mx-auto'>
            <h1 className='text-2xl md:text-4xl font-bold text-center text-red-600 mb-3'>
            🔥 FLASH SALE - 80% OFF 🔥
            </h1>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-center text-red-500 text-sm md:text-base font-semibold animate-pulse'>
                ⚡ Only {Math.floor(Math.random() * 10) + 1} items left at this price!
                </p>

                <div className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm'>
                ⏰ Offer ends soon!
                </div>

            </div>

        </div>

        </div>

        {/* Guarantee Items*/}

        <div className='bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 py-4 '>
            <div className='container mx-auto'>
                <div className='flex flex-wrap items-center justify-center gap-6 text-sm'>
                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-600 text-xl'>🚚</span>
                        <span className='font-medium'>Free Express Shipping</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-600 text-xl'>✨</span>
                        <span className='font-medium'>Satisfaction Guaranteed</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-600 text-xl'>🔒</span>
                        <span className='font-medium'>Secure Checkout</span>
                    </div>

                </div>

            </div>
        </div>

        {/* Product Details */}
        <div className='container mx-auto py-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
            
            {/* Product Image */}
            {product.image && (
                <div className='bg-white rounded-2xl p-4 aspect-square overflow-hidden shadow-lg'>
                <div className='relative aspect-square'>
                    <Image 
                            fill
                            priority
                            className='object-color hover:scale-105 transistion-transform duration-300'
                            alt={product.title ?? 'Product Image'}
                            src={urlFor(product.image).url()}
                    />

                </div>
                </div>
            )}

            {/* Product Information*/}

            <div className='flex flex-col gap-4'>

                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
                    {product.title}

                </h1>
            </div>
            </div>
        </div>

    </div>
  )
}

export default ProductPage