import { FallbackWrapper } from './styled';
import Spinner from 'components/Spinner';


const FallbackSpinner = () => {
	return (
		<>
			<FallbackWrapper>
				<Spinner />
			</FallbackWrapper>
		</>
	);
}

export default FallbackSpinner;