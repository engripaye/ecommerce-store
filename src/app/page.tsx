import { getCurrentSession } from "@/actions/auth";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/sanity/lib/client";


const Home = async () => {
  const { user } = await getCurrentSession();
  const products = await getAllProducts();

 return (
  <div>
    <SalesCampaignBanner />


    <section className="container mx-auto px-8">
    


    {/* Product Grid */}

    <ProductGrid products={products} />
    
    </section>
  </div>
 );
};

export default Home;

