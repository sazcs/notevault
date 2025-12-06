import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CodePreview from '../components/landing/CodePreview';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const Home = () => {
	return (
		<div className='min-h-screen bg-neutral-950 text-neutral-50'>
			<Header />
			<Hero />
			<Features />
			<CodePreview />
			<CTA />
			<Footer />
		</div>
	);
};

export default Home;
