import React from 'react'

export default function Footer() {
  return (
    <footer class="py-1 bg-theme mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <small class="text-silver">Copyright &copy; Hometex Bangladesh {new Date().getFullYear()} | Version: 0.1.0 Beta</small>
                            <div>
                                <small className='text-silver' >
                                   Design & Developed By <a className={'text-white'} href="shahadat.tk">Shahadath Hossain</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </footer>
  )
}
