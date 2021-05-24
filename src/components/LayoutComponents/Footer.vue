<template>
    <div class="footer">
        <!-- Footer -->
        <mdb-footer color="blue" class="font-small pt-4 mt-0">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="footer-content">

                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright text-center py-3">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <p class="mt-auto mb-auto">&copy; 2021 Purchase Plan</p>
                        </div>
                    </div>
                </div>
            </div>
        </mdb-footer>
        <!-- Footer -->
    </div>
</template>

<script>
    import { mdbFooter } from 'mdbvue';
    export default {
        name: 'FooterPage',
        components: {
            mdbFooter
        }
    }
</script>

<style>
    .footer {
        margin-top: -24px;
    }
    .footer-content{
        height: 5vh;
    }
</style>
