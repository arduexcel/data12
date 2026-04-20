function printFinalReport() {
    // encodeURIComponent بەکار دێت بۆ ئەوەی ئەگەر ناوەکە کوردی بێت تێک نەچێت
    window.open(`report.html?user=${encodeURIComponent(currentUser)}`, '_blank');
}
<script>
    // ... کۆدە کۆنەکانی تر وەک خۆی ...

    window.onload = initReport;

    // ئەم بەشە نوێیە بۆ داخستنەوەی وێبەکە دوای پرنت
    window.onafterprint = function() {
        window.close();
    };
</script>
