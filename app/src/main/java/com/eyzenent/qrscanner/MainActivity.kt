package com.eyzenent.qrscanner

import android.Manifest
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.eyzenent.qrscanner.databinding.ActivityMainBinding
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService
    private var isScanning = true
    private var lastScannedValue: String? = null

    private val barcodeScanner by lazy {
        val options = BarcodeScannerOptions.Builder()
            .setBarcodeFormats(
                Barcode.FORMAT_QR_CODE,
                Barcode.FORMAT_AZTEC,
                Barcode.FORMAT_DATA_MATRIX
            )
            .build()
        BarcodeScanning.getClient(options)
    }

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            startCamera()
        } else {
            binding.permissionLayout.visibility = View.VISIBLE
            binding.previewView.visibility = View.GONE
            binding.scanOverlay.visibility = View.GONE
            binding.statusText.text = getString(R.string.camera_permission_denied)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()

        binding.copyButton.setOnClickListener { copyResult() }
        binding.openButton.setOnClickListener { openResult() }
        binding.scanAgainButton.setOnClickListener { scanAgain() }
        binding.grantPermissionButton.setOnClickListener { checkCameraPermission() }

        checkCameraPermission()
    }

    private fun checkCameraPermission() {
        when {
            ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) ==
                PackageManager.PERMISSION_GRANTED -> {
                binding.permissionLayout.visibility = View.GONE
                binding.previewView.visibility = View.VISIBLE
                binding.scanOverlay.visibility = View.VISIBLE
                startCamera()
            }
            else -> {
                binding.permissionLayout.visibility = View.VISIBLE
                binding.previewView.visibility = View.GONE
                binding.scanOverlay.visibility = View.GONE
                requestPermissionLauncher.launch(Manifest.permission.CAMERA)
            }
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder().build().also {
                it.setSurfaceProvider(binding.previewView.surfaceProvider)
            }

            val imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also { analysis ->
                    analysis.setAnalyzer(cameraExecutor) { imageProxy ->
                        if (!isScanning) {
                            imageProxy.close()
                            return@setAnalyzer
                        }

                        val mediaImage = imageProxy.image
                        if (mediaImage != null) {
                            val image = InputImage.fromMediaImage(
                                mediaImage,
                                imageProxy.imageInfo.rotationDegrees
                            )

                            barcodeScanner.process(image)
                                .addOnSuccessListener { barcodes ->
                                    for (barcode in barcodes) {
                                        barcode.rawValue?.let { value ->
                                            if (value != lastScannedValue) {
                                                lastScannedValue = value
                                                runOnUiThread { onBarcodeDetected(value) }
                                            }
                                        }
                                    }
                                }
                                .addOnCompleteListener {
                                    imageProxy.close()
                                }
                        } else {
                            imageProxy.close()
                        }
                    }
                }

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    CameraSelector.DEFAULT_BACK_CAMERA,
                    preview,
                    imageAnalysis
                )
                binding.statusText.text = getString(R.string.scanning_hint)
            } catch (e: Exception) {
                binding.statusText.text = getString(R.string.camera_error)
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun onBarcodeDetected(value: String) {
        isScanning = false
        binding.statusText.text = getString(R.string.scan_success)
        binding.resultCard.visibility = View.VISIBLE
        binding.resultText.text = value

        val isUrl = value.startsWith("http://") || value.startsWith("https://")
        binding.openButton.visibility = if (isUrl) View.VISIBLE else View.GONE
    }

    private fun copyResult() {
        val text = binding.resultText.text?.toString().orEmpty()
        if (text.isEmpty()) return

        val clipboard = getSystemService(ClipboardManager::class.java)
        clipboard.setPrimaryClip(ClipData.newPlainText("QR Result", text))
        Toast.makeText(this, R.string.copied_to_clipboard, Toast.LENGTH_SHORT).show()
    }

    private fun openResult() {
        val text = binding.resultText.text?.toString().orEmpty()
        if (text.isEmpty()) return

        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(text)))
        } catch (e: Exception) {
            Toast.makeText(this, R.string.open_link_failed, Toast.LENGTH_SHORT).show()
        }
    }

    private fun scanAgain() {
        isScanning = true
        lastScannedValue = null
        binding.resultCard.visibility = View.GONE
        binding.resultText.text = ""
        binding.statusText.text = getString(R.string.scanning_hint)
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        barcodeScanner.close()
    }
}
