import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../assets/wrappers/SearchContainer";
import {FormRow} from "../index";
import FormRowSelect from "../FormRowSelect";
import {clearFilters, handleChange} from "../../features/allJobs/allJobsSlice";

const SearchContainer = () => {

    const { isLoading, search, searchStatus, searchType } = useSelector(store => store.allJobs)
    const { jobTypeOptions, statusOptions } = useSelector(store => store.job)
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        dispatch(handleChange({name: e.target.name, value: e.target.value}))
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(clearFilters())
    }


    return (
        <Wrapper>
            <form className={'form'}>
                <h4>search from</h4>
                <div className={'form-center'}>
                    <FormRow type={'text'}
                             name={'search'}
                             value={search}
                             handleChange={handleSearch}
                    />
                    <FormRowSelect labelText={'status'}
                                   name={'searchStatus'}
                                   value={searchStatus}
                                   handleChange={handleSearch}
                                   list={['all', ...statusOptions]}
                    />
                    <FormRowSelect labelText={'type'}
                                   name={'searchType'}
                                   value={searchType}
                                   handleChange={handleSearch}
                                   list={['all', ...jobTypeOptions]}
                    />
                    <button className={'btn btn-block btn-danger'}
                            disabled={isLoading}
                            onClick={handleSubmit}
                    >
                        clear filter
                    </button>

                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;