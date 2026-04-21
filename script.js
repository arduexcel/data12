function printFinalReport() {
    // encodeURIComponent بەکار دێت بۆ ئەوەی ئەگەر ناوەکە کوردی بێت تێک نەچێت
    window.open(`report.html?user=${encodeURIComponent(currentUser)}`, '_blank');
}
<script>
    // ... کۆدە کۆنەکانی تر وەک خۆی ...

    window.onload = initReport;

// ئەم بەشە دەستکاری کراوە بۆ گەڕانەوە بۆ دواوە
window.onafterprint = function() {
    window.history.back();
};
</script>
