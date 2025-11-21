import React from "react";

const TopHeader = () => {
return (
<section
className="colored py-0 top-header"
style={{ backgroundColor: "rgb(0, 0, 0)" }}
> <div className="container">
{<section
  className="colored py-0 top-header"
  style={{ backgroundColor: "rgb(0, 0, 0)" }}
>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-sm-12 col-12 column col-xl-6 col-lg-6 col-md-6">
        <div className="block-content clearfix block-description">
          <div>
            <a href="https://pollub.pl" target="_blank" rel="noopener noreferrer">
              Strona główna Politechniki Lubelskiej&nbsp;&nbsp;
            </a>
            <a href="https://szermierka.pollub.pl/panel/" target="_blank" rel="noopener noreferrer">
              Panel
            </a>
          </div>
        </div>
      </div>

```
  <div className="col-sm-12 col-12 column col-xl-6 d-flex align-items-center justify-content-end col-lg-6 col-md-6">
    <div className="block-content clearfix block-social">
      <a rel="noreferrer" href="https://www.facebook.com/GFHLublin" className="social-link fb">
        <i className="fab fa-facebook-f"></i>
        <span className="sr-only">Facebook</span>
      </a>
      <a rel="noreferrer" href="https://www.instagram.com/grupa_fechtunku_historycznego?igsh=MWhrY2M1cjM4MGx5Zw==" className="social-link in">
        <i className="fab fa-instagram"></i>
        <span className="sr-only">Instagram</span>
      </a>
    </div>

    <div className="block-content clearfix block-searchadvanced">
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center" data-toggle="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <div className="name ml-2">
            Wyszukaj <i className="fa fa-angle-down pl-2"></i>
          </div>
        </a>

        <div className="list-unstyled dropdown-menu dropdown-menu-right">
          <div className="dropdown-header">Wyszukaj</div>
          <div className="px-4 pb-3">
            <form
              data-focus="false"
              className="searchForm"
              action="/wyszukiwarka"
              method="GET"
              data-toggle="validator"
              name="Index-5"
              id="searchForm"
              noValidate
            >
              <input
                value="8JwllSQMQandZVhsaERdaXnF3RGMBQmYDDQdPIm1EcAl0Ny9WPBcLID8xDQBaUxsPUAw4e0JvFwExU11EESN1TjIJZGl8ETgHDBMjfkxbCxIXRwxeLjMeNBsDO1lUQxZ_JxljCCVrdwNqUREHNSoXDR4BF0dDDDh7RGAPUR57bm8MEAUGDXU_IhR0AVFDEGp1Vk5aABtRBVIlBxwwWRcndkpVVmokT3IBbHNyAzMXT1ZgJgEVQVBFBQcGcyAUMVRBYAIAVEZlb0FxUnRqOw"
                id="VALIDATOR_91798"
                name="_VALIDATOR"
                type="hidden"
              />
              <div className="nav-tabs-custom clearfix">
                <div className="input-group">
                  <label htmlFor="query-5" className="sr-only">
                    Wpisz szukaną frazę
                  </label>
                  <input
                    placeholder="Wpisz szukaną frazę"
                    aria-invalid="true"
                    required
                    minLength={3}
                    name="query"
                    id="query-5"
                    value=""
                    type="text"
                    className="form-control"
                    maxLength={64}
                  />
                  <div className="help-block with-errors"></div>

                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary form-control disabled">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="3" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <span className="sr-only">Wyszukaj</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <a className="dropdown-item" href="/wyszukiwarka">
            <i className="fas fa-filter pr-2"></i>
            Wyszukiwarka zaawansowana
          </a>
        </div>
      </div>

      <div className="style-controls dropdown mr-3">
        <button className="d-flex align-items-center" data-toggle="dropdown">
          <i className="far fa-eye"></i>
          <span className="name ml-2 d-none d-lg-block">
            Kontrast <i className="fa fa-angle-down pl-2"></i>
          </span>
        </button>
        <div className="list-unstyled style-controls-hover dropdown-menu dropdown-menu-right">
          <div className="dropdown-header">Zmień rozmiar czcionki</div>
          <div className="font-controls px-4 pb-2">
            <button className="font normal active" data-size="normal" data-toggle="tooltip" data-placement="bottom" title="Normalna czcionka">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">Normalna czcionka</span>
            </button>
            <button className="font bigger" data-size="bigger" data-toggle="tooltip" data-placement="bottom" title="Większa czcionka">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">Większa czcionka</span>
            </button>
            <button className="font biggest" data-size="biggest" data-toggle="tooltip" data-placement="bottom" title="Największa czcionka">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">Największa czcionka</span>
            </button>
          </div>

          <div className="dropdown-header">Wersje kontrastowe</div>
          <div className="px-4 pb-2">
            <button className="contrast classic" data-style="style" data-toggle="tooltip" data-placement="bottom" title="kontrast domyślny">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">kontrast domyślny</span>
            </button>
            <button className="contrast black" data-style="style-b" data-toggle="tooltip" data-placement="bottom" title="kontrast biały tekst na czarnym">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">kontrast biały tekst na czarnym</span>
            </button>
            <button className="contrast yellow" data-style="style-y" data-toggle="tooltip" data-placement="bottom" title="kontrast czarny tekst na żółtym">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">kontrast czarny tekst na żółtym</span>
            </button>
            <button className="contrast black-yellow" data-style="style-by" data-toggle="tooltip" data-placement="bottom" title="kontrast żółty tekst na czarnym">
              <i className="fa fa-font" aria-hidden="true"></i>
              <span className="sr-only">kontrast żółty tekst na czarnym</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
```

  </div>
</section>
} </div> </section>
);
};

export default TopHeader;
